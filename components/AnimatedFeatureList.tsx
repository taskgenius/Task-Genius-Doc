"use client";

import { useRef, useEffect } from "react";
import { CheckCircleIcon } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 注册 ScrollTrigger 插件
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedFeatureListProps {
  features: string[];
}

export default function AnimatedFeatureList({
  features,
}: AnimatedFeatureListProps) {
  const containerRef = useRef<HTMLUListElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const items = itemsRef.current;

    // 创建时间线
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 110%", // 当容器顶部到达视口80%位置时开始
        end: "bottom 50%", // 当容器底部到达视口20%位置时结束
        scrub: 0.5, // 关键：让动画跟随滚动进度，1表示1秒的延迟
        onUpdate: (self) => {
          // 根据滚动进度计算应该显示多少个checkbox
          const progress = self.progress;
          const totalItems = features.length;
          const activeCount = Math.floor(progress * totalItems);

          items.forEach((item, index) => {
            if (!item) return;

            const circle = item.querySelector(".circle") as HTMLElement;
            const checkIcon = item.querySelector(".check-icon") as HTMLElement;
            const text = item.querySelector(".check-text") as HTMLElement;

            if (index < activeCount) {
              // 显示打勾
              if (circle) {
                circle.style.opacity = "0";
                circle.style.transform = "scale(0.8)";
              }
              if (checkIcon) {
                checkIcon.style.opacity = "1";
                checkIcon.style.transform = "scale(1)";
              }
              if (text) {
                text.style.color = "var(--color-fd-foreground)";
              }
            } else {
              // 显示圆圈
              if (circle) {
                circle.style.opacity = "1";
                circle.style.transform = "scale(1)";
              }
              if (checkIcon) {
                checkIcon.style.opacity = "0";
                checkIcon.style.transform = "scale(0.6)";
              }
              if (text) {
                text.style.color = "var(--color-fd-muted-foreground)";
              }
            }
          });
        },
      },
    });

    // 初始状态：所有都是圆圈
    items.forEach((item) => {
      if (!item) return;

      const circle = item.querySelector(".circle") as HTMLElement;
      const checkIcon = item.querySelector(".check-icon") as HTMLElement;
      const text = item.querySelector(".check-text") as HTMLElement;

      if (circle) {
        circle.style.opacity = "1";
        circle.style.transform = "scale(1)";
        circle.style.transition = "all 0.3s ease-out";
      }
      if (checkIcon) {
        checkIcon.style.opacity = "0";
        checkIcon.style.transform = "scale(0.6)";
        checkIcon.style.transition =
          "all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
      }
      if (text) {
        text.style.color = "var(--color-fd-muted-foreground)";
      }
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [features.length]);

  return (
    <ul
      ref={containerRef}
      className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2"
    >
      {features.map((feature, index) => (
        <li
          key={feature}
          ref={(el) => {
            itemsRef.current[index] = el;
          }}
          className="flex items-center text-sm md:pl-20"
        >
          <div className="relative mr-2 size-5 flex-shrink-0">
            {/* 未选中状态的圆圈 */}
            <div className="circle absolute inset-0 border-2 border-fd-muted rounded-full" />
            {/* 选中状态的勾 */}
            <div className="check-icon">
              <CheckCircleIcon className="size-5 text-fd-primary" />
            </div>
          </div>
          <span className="check-text">{feature}</span>
        </li>
      ))}
    </ul>
  );
}
