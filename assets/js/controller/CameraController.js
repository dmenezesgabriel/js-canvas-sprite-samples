export default class CameraController {
  followTarget(camera, targetX, targetY, targetWidth, targetHeight) {
    if (targetX < camera.leftEdge()) {
      camera.position.x = targetX - camera.width * 0.25;
    }
    if (targetX + targetWidth > camera.rightEdge()) {
      camera.position.x = targetX + targetWidth - camera.width * 0.75;
    }
    if (targetY < camera.topEdge()) {
      camera.position.y = targetY - camera.height * 0.25;
    }
    if (targetY + targetHeight > camera.bottomEdge()) {
      camera.position.y = targetY + targetHeight - camera.height * 0.75;
    }
  }

  handleMapLimits(camera, mapWidth, mapHeight) {
    // Limits
    if (camera.position.x < 0) {
      camera.position.x = 0;
    }
    if (camera.position.x + camera.width > mapWidth) {
      camera.position.x = mapWidth - camera.width;
    }
    if (camera.position.y < 0) {
      camera.position.y = 0;
    }
    if (camera.position.y + camera.height > mapHeight) {
      camera.position.y = mapHeight - camera.height;
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
