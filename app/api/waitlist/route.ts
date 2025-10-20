import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { z } from "zod";

/**
 * 邮箱验证 Schema
 * 使用 Zod 进行严格的类型和格式验证
 */
const emailSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .min(5, "Email too short")
    .max(255, "Email too long")
    .toLowerCase()
    .trim(),
});

/**
 * POST /api/waitlist
 * 提交邮箱到等候列表
 *
 * @param request - Next.js Request 对象
 * @returns JSON 响应，包含成功/错误信息
 */
export async function POST(request: NextRequest) {
  try {
    // 1. 解析请求体
    const body = await request.json();

    // 2. 验证邮箱格式（客户端 + 服务端双重验证）
    const validation = emailSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Invalid email address",
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { email } = validation.data;

    // 3. 检查邮箱是否已存在（防重复）
    const { data: existingEntry, error: checkError } = await supabase
      .from("waitlist")
      .select("email")
      .eq("email", email)
      .maybeSingle();

    if (checkError) {
      console.error("Database query error:", checkError);
      return NextResponse.json(
        { error: "Database error occurred" },
        { status: 500 }
      );
    }

    if (existingEntry) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 } // 409 Conflict
      );
    }

    // 4. 插入新邮箱到数据库
    const { data, error: insertError } = await supabase
      .from("waitlist")
      .insert({
        email,
        metadata: {
          source: "desktop-waitlist",
          userAgent: request.headers.get("user-agent") || "unknown",
          submittedAt: new Date().toISOString(),
        },
      })
      .select()
      .single();

    if (insertError) {
      console.error("Database insert error:", insertError);

      // 处理唯一约束冲突（并发请求场景）
      if (insertError.code === "23505") {
        return NextResponse.json(
          { error: "Email already registered" },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { error: "Failed to register email" },
        { status: 500 }
      );
    }

    // 5. 成功响应
    return NextResponse.json(
      {
        success: true,
        message: "Successfully joined waitlist",
        data: {
          id: data.id,
          email: data.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Waitlist API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/waitlist
 * 获取等候列表统计信息（可选功能）
 */
export async function GET() {
  try {
    const { count, error } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error("Database count error:", error);
      return NextResponse.json(
        { error: "Failed to fetch stats" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      total: count || 0,
    });
  } catch (error) {
    console.error("Waitlist stats error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
