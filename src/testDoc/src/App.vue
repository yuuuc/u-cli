<script setup lang="ts"></script>

<template>
  <div class="container">
    <div class="menu">
      <div class="menu-item">内容一</div>
    </div>
    <div class="content"></div>
  </div>
</template>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
}
.menu {
  width: 266px;
}

.menu-item {
  height: 40px;
  font-size: 13px;
  display: flex;
  align-items: center;
  padding: 10px 16px;
  user-select: none;
}

.menu-item:hover {
  color: #44dd88;
}

.content {
  flex: 1;
}
</style>
