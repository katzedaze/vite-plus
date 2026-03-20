import { describe, expect, it } from "vite-plus/test";
import { contactSchema } from "../src/schemas/contact";

const validData = {
  name: "Taro Yamada",
  email: "taro@example.com",
  category: "general" as const,
  message: "This is a valid test message.",
};

describe("contactSchema", () => {
  it("accepts valid input", () => {
    const result = contactSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  describe("name", () => {
    it("rejects empty name", () => {
      const result = contactSchema.safeParse({ ...validData, name: "" });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe("Name must be at least 2 characters.");
      }
    });

    it("rejects name with 1 character", () => {
      const result = contactSchema.safeParse({ ...validData, name: "A" });
      expect(result.success).toBe(false);
    });

    it("accepts name with 2 characters", () => {
      const result = contactSchema.safeParse({ ...validData, name: "AB" });
      expect(result.success).toBe(true);
    });

    it("rejects name over 50 characters", () => {
      const result = contactSchema.safeParse({ ...validData, name: "A".repeat(51) });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe("Name must be at most 50 characters.");
      }
    });

    it("accepts name with exactly 50 characters", () => {
      const result = contactSchema.safeParse({ ...validData, name: "A".repeat(50) });
      expect(result.success).toBe(true);
    });
  });

  describe("email", () => {
    it("rejects empty email", () => {
      const result = contactSchema.safeParse({ ...validData, email: "" });
      expect(result.success).toBe(false);
    });

    it("rejects invalid email format", () => {
      const result = contactSchema.safeParse({ ...validData, email: "not-an-email" });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe("Please enter a valid email address.");
      }
    });

    it("accepts valid email", () => {
      const result = contactSchema.safeParse({ ...validData, email: "user@domain.co.jp" });
      expect(result.success).toBe(true);
    });
  });

  describe("category", () => {
    it.each(["general", "support", "feedback", "bug"] as const)("accepts '%s'", (category) => {
      const result = contactSchema.safeParse({ ...validData, category });
      expect(result.success).toBe(true);
    });

    it("rejects invalid category", () => {
      const result = contactSchema.safeParse({ ...validData, category: "unknown" });
      expect(result.success).toBe(false);
    });
  });

  describe("message", () => {
    it("rejects message under 10 characters", () => {
      const result = contactSchema.safeParse({ ...validData, message: "Short" });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe("Message must be at least 10 characters.");
      }
    });

    it("accepts message with exactly 10 characters", () => {
      const result = contactSchema.safeParse({ ...validData, message: "A".repeat(10) });
      expect(result.success).toBe(true);
    });

    it("rejects message over 500 characters", () => {
      const result = contactSchema.safeParse({ ...validData, message: "A".repeat(501) });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe("Message must be at most 500 characters.");
      }
    });

    it("accepts message with exactly 500 characters", () => {
      const result = contactSchema.safeParse({ ...validData, message: "A".repeat(500) });
      expect(result.success).toBe(true);
    });
  });

  describe("multiple errors", () => {
    it("reports all field errors at once", () => {
      const result = contactSchema.safeParse({
        name: "",
        email: "bad",
        category: "invalid",
        message: "short",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        const paths = result.error.issues.map((i) => i.path[0]);
        expect(paths).toContain("name");
        expect(paths).toContain("email");
        expect(paths).toContain("category");
        expect(paths).toContain("message");
      }
    });
  });
});
