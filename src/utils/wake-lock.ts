export async function requestWakeLock() {
  try {
    if ("wakeLock" in navigator) {
      const wakeLock = await navigator.wakeLock.request("screen");
      return wakeLock;
    }
  } catch (error) {
    console.error("Failed to acquire wake lock:", error);
  }
}
