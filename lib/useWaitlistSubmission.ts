import { useState, useCallback, useRef, useEffect } from "react";

/**
 * Cookie configuration
 */
const COOKIE_PREFIX = "tg_waitlist_";
const COOLDOWN_HOURS = 24; // Cooldown period: 24 hours

/**
 * Hook return type
 */
interface UseWaitlistSubmissionReturn {
  email: string;
  setEmail: (email: string) => void;
  submitted: boolean;
  error: string;
  loading: boolean;
  canSubmit: boolean;
  cooldownRemaining: number | null;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  resetSubmission: () => void;
}

/**
 * Cookie utility functions
 */
const cookieUtils = {
  /**
   * Set a cookie
   */
  set(name: string, value: string, hours: number) {
    const maxAge = hours * 60 * 60; // Convert to seconds
    const secure = window.location.protocol === "https:" ? "Secure;" : "";
    document.cookie = `${name}=${value}; max-age=${maxAge}; path=/; SameSite=Lax; ${secure}`;
  },

  /**
   * Get a cookie value
   */
  get(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(";").shift() || null;
    }
    return null;
  },

  /**
   * Delete a cookie
   */
  delete(name: string) {
    document.cookie = `${name}=; max-age=0; path=/;`;
  },

  /**
   * Get all cookies with a specific prefix
   */
  getAllWithPrefix(prefix: string): Array<{ name: string; value: string }> {
    return document.cookie
      .split(";")
      .map((c) => c.trim())
      .filter((c) => c.startsWith(prefix))
      .map((c) => {
        const [name, value] = c.split("=");
        return { name, value };
      });
  },
};

/**
 * Custom Hook: Handle waitlist submission logic
 *
 * Features:
 * - Debounce protection (prevent rapid repeated clicks)
 * - Cookie detection (prevent duplicate submissions from same browser)
 * - Cooldown period limitation (cannot resubmit within 24 hours)
 * - Privacy-friendly: only stores hashed email
 * - Auto-expiration: Cookie has built-in max-age mechanism
 */
export function useWaitlistSubmission(): UseWaitlistSubmissionReturn {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [canSubmit, setCanSubmit] = useState(true);
  const [cooldownRemaining, setCooldownRemaining] = useState<number | null>(null);

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastSubmitTimeRef = useRef<number>(0);

  /**
   * Simple email hash function (privacy protection)
   * Note: This is not encryption, just obfuscation to avoid plain text storage
   */
  const hashEmail = (email: string): string => {
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      const char = email.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(36);
  };

  /**
   * Save submission record to Cookie
   */
  const saveSubmissionRecord = (email: string) => {
    try {
      const hashedEmail = hashEmail(email);
      const cookieName = `${COOKIE_PREFIX}${hashedEmail}`;
      const timestamp = Date.now().toString();

      // Set cookie with 24-hour auto-expiration
      cookieUtils.set(cookieName, timestamp, COOLDOWN_HOURS);
    } catch (err) {
      console.warn("Failed to save submission record:", err);
    }
  };

  /**
   * Check if email is within cooldown period
   */
  const checkCooldown = useCallback((email: string): number | null => {
    if (!email) return null;

    try {
      const hashedEmail = hashEmail(email);
      const cookieName = `${COOKIE_PREFIX}${hashedEmail}`;
      const timestampStr = cookieUtils.get(cookieName);

      if (!timestampStr) return null;

      const timestamp = parseInt(timestampStr, 10);
      if (isNaN(timestamp)) return null;

      const cooldownMs = COOLDOWN_HOURS * 60 * 60 * 1000;
      const elapsed = Date.now() - timestamp;

      if (elapsed < cooldownMs) {
        const remainingMs = cooldownMs - elapsed;
        return Math.ceil(remainingMs / (60 * 60 * 1000)); // Return remaining hours
      }

      return null;
    } catch {
      return null;
    }
  }, []);

  /**
   * Check for recent submission records on page load
   * If found, automatically display submitted state
   */
  useEffect(() => {
    try {
      // Get all waitlist-related cookies
      const allSubmissions = cookieUtils.getAllWithPrefix(COOKIE_PREFIX);

      if (allSubmissions.length > 0) {
        // Find the most recent submission record
        const latestSubmission = allSubmissions
          .map(({ value }) => parseInt(value, 10))
          .filter((timestamp) => !isNaN(timestamp))
          .sort((a, b) => b - a)[0]; // Sort descending, get latest

        if (latestSubmission) {
          const cooldownMs = COOLDOWN_HOURS * 60 * 60 * 1000;
          const elapsed = Date.now() - latestSubmission;

          // If within cooldown period, user submitted recently, show submitted state
          if (elapsed < cooldownMs) {
            setSubmitted(true);
          }
        }
      }
    } catch (err) {
      console.warn("Failed to check submission history:", err);
    }
  }, []); // Execute only once on component mount

  /**
   * Real-time check of current email's cooldown status
   */
  useEffect(() => {
    if (!email) {
      setCooldownRemaining(null);
      setCanSubmit(true);
      return;
    }

    const remaining = checkCooldown(email);
    setCooldownRemaining(remaining);
    setCanSubmit(remaining === null);
  }, [email, checkCooldown]);

  /**
   * Submit handler with debounce
   */
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");

      // 1. Debounce check (prevent duplicate clicks within 500ms)
      const now = Date.now();
      if (now - lastSubmitTimeRef.current < 500) {
        setError("Please wait a moment before submitting again");
        return;
      }
      lastSubmitTimeRef.current = now;

      // 2. Cooldown period check
      const remainingHours = checkCooldown(email);
      if (remainingHours !== null) {
        setError(
          `This email was recently submitted. Please try again in ${remainingHours} hour${remainingHours > 1 ? "s" : ""}.`
        );
        return;
      }

      // 3. Client-side email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError("Please enter a valid email address");
        return;
      }

      setLoading(true);

      // 4. Clear previous debounce timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // 5. Use debounce to delay actual API call execution
      debounceTimerRef.current = setTimeout(async () => {
        try {
          const response = await fetch("/api/waitlist", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          });

          const data = await response.json();

          if (!response.ok) {
            if (response.status === 409) {
              setError("This email is already on the waitlist");
            } else if (data.error) {
              setError(data.error);
            } else {
              setError("Something went wrong. Please try again later.");
            }
            return;
          }

          // 6. Successful submission - save to local storage
          saveSubmissionRecord(email);
          console.log("Waitlist submission successful:", data);
          setSubmitted(true);
          setEmail("");
        } catch (err) {
          setError("Network error. Please check your connection and try again.");
          console.error("Waitlist submission error:", err);
        } finally {
          setLoading(false);
        }
      }, 300); // 300ms debounce
    },
    [email, checkCooldown]
  );

  /**
   * Reset submission state (for "Join with another email" button)
   */
  const resetSubmission = useCallback(() => {
    setSubmitted(false);
    setError("");
    setEmail("");
  }, []);

  /**
   * Cleanup effect
   */
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return {
    email,
    setEmail,
    submitted,
    error,
    loading,
    canSubmit,
    cooldownRemaining,
    handleSubmit,
    resetSubmission,
  };
}
