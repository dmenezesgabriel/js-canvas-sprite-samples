export default class CameraController {
  followTarget(camera, targetX, targetY, targetWidth, targetHeight) {
    if (targetX < camera.leftEdge()) {
      camera.x = targetX - camera.width * 0.25;
    }
    if (targetX + targetWidth > camera.rightEdge()) {
      camera.x = targetX + targetWidth - camera.width * 0.75;
    }
    if (targetY < camera.topEdge()) {
      camera.y = targetY - camera.height * 0.25;
    }
    if (targetY + targetHeight > camera.bottomEdge()) {
      camera.y = targetY + targetHeight - camera.height * 0.75;
    }
  }

  handleMapLimits(camera, mapWidth, mapHeight) {
    // Limits
    if (camera.x < 0) {
      camera.x = 0;
    }
    if (camera.x + camera.width > mapWidth) {
      camera.x = mapWidth - camera.width;
    }
    if (camera.y < 0) {
      camera.y = 0;
    }
    if (camera.y + camera.height > mapHeight) {
      camera.y = mapHeight - camera.height;
    }
  }

  moveCamera(
    camera,
    targetX,
    targetY,
    targetWidth,
    targetHeight,
    mapWidth,
    mapHeight
  ) {
    this.followTarget(camera, targetX, targetY, targetWidth, targetHeight);
    this.handleMapLimits(camera, mapWidth, mapHeight);
  }
}
