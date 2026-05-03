import { POST } from "./route.ts";

export async function test() {
  const originalPassword = process.env.ADMIN_PASSWORD;

  let passed = true;

  try {
    delete process.env.ADMIN_PASSWORD;

    const req = new Request("http://localhost/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ password: "some-password" }),
    });

    const response = await POST(req);

    if (response.status !== 500) {
      console.error("Test failed: expected 500 status code");
      passed = false;
    }
  } catch (err) {
    console.error("Test error:", err);
    passed = false;
  } finally {
    if (originalPassword) {
      process.env.ADMIN_PASSWORD = originalPassword;
    }
  }

  if (passed) {
    console.log("SUCCESS: Route test passed");
  } else {
    process.exit(1);
  }
}

test();
