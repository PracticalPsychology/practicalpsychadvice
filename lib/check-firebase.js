/**
 * Firebase Dependency Check
 *
 * This script verifies that the project does not depend on Firebase.
 * The application is a Next.js book store with Stripe integration,
 * not a Firebase-based application.
 */

const fs = require("fs");
const path = require("path");

function checkFirebaseReferences() {
  console.log("\n🔍 Checking for Firebase dependencies...\n");

  const packageJsonPath = path.join(__dirname, "../package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

  const allDeps = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  const firebasePackages = Object.keys(allDeps).filter((dep) =>
    dep.includes("firebase"),
  );

  if (firebasePackages.length > 0) {
    console.warn("⚠️  Found Firebase packages in dependencies:");
    firebasePackages.forEach((pkg) => {
      console.warn(`   - ${pkg}@${allDeps[pkg]}`);
    });
    console.warn(
      "\n📝 These should be removed since this is a Stripe-based project.\n",
    );
  } else {
    console.log(
      "✅ No Firebase packages found in dependencies (as expected)\n",
    );
  }

  // Check for Firebase environment variables
  const envPath = path.join(__dirname, "../.env.local");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    const firebaseEnvVars = envContent
      .split("\n")
      .filter((line) => line.includes("FIREBASE"));

    if (firebaseEnvVars.length > 0) {
      console.warn("⚠️  Found Firebase environment variables:");
      firebaseEnvVars.forEach((line) => {
        const [key] = line.split("=");
        console.warn(`   - ${key}`);
      });
      console.warn("\n📝 These are not needed and can be safely removed.\n");
    } else {
      console.log("✅ No Firebase environment variables found (as expected)\n");
    }
  }

  console.log(
    "📋 Project Info: Practical Psychology Book Store - Next.js + Stripe\n",
  );
  console.log("Main integrations:");
  console.log("   ✓ Next.js 14+");
  console.log("   ✓ Stripe for payments");
  console.log("   ✓ Static HTML pages for book catalog\n");
}

// Run the check
checkFirebaseReferences();
