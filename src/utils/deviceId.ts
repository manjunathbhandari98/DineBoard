// src/utils/deviceId.ts

export function getOrCreateDeviceId(): string {
  let deviceId = localStorage.getItem("deviceId");
  if (!deviceId) {
    deviceId = crypto.randomUUID(); // Generate unique UUID
    localStorage.setItem("deviceId", deviceId);
    console.log(
      "Generated new deviceId:",
      deviceId
    ); // Add logging
  } else {
    console.log(
      "Retrieved existing deviceId:",
      deviceId
    ); // Add logging
  }
  return deviceId;
}
