<template lang="">
  <el-container class="default-layout h-screen overflow-hidden">
    <client-only>
      <el-drawer
        class="aside-drawer bg-gray-800 text-white dark:bg-gray-900"
        v-if="isMobile"
        v-model="drawerModelValue"
        direction="ltr"
        :with-header="false"
        size="200px"
      >
        <!-- <div class="">6666</div> -->
        <div ref="drawerRef"></div>
      </el-drawer>
    </client-only>
    <client-only>
      <teleport
        v-if="!isMobile || drawerRef"
        :to="isMobile ? drawerRef : null"
        :disabled="!isMobile"
      >
        <el-aside
          class="bg-gray-800 text-white overflow-x-hidden2 dark:bg-gray-900"
          :class="{ 'is-collapse': isMobile ? false : collapse }"
        >
          <div class="flex items-center justify-center p-2 overflow-hidden">
            <el-image class="logo w-8 h-8" :class="{}">
              <template #error>
                <div class="flex items-center justify-center h-full">
                  <el-icon size="32px"><el-icon-element-plus /></el-icon>
                </div>
              </template>
            </el-image>
            <transition name="logo-title">
              <div
                v-if="isMobile ? true : !collapse"
                class="ml-2 whitespace-nowrap"
              >
                Element Plus
              </div>
            </transition>
          </div>
          <nav-menu
            :collapse="isMobile ? false : collapse"
            @select="onMenuSelect"
          ></nav-menu>
        </el-aside>
      </teleport>
    </client-only>

    <el-container class=" ">
      <el-header class="h-auto py-2 shadow-md">
        <page-header v-model:collapse="collapse"></page-header>
      </el-header>
      <el-scrollbar>
        <NuxtPage />
      </el-scrollbar>
      <el-footer class="h-6">Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
const isMobile = useMediaQuery("(max-width: 768px)");

const collapse = ref(isMobile.value);

const drawerModelValue = computed({
  get() {
    return !collapse.value;
  },
  set(value) {
    collapse.value = !value;
  },
});
const drawerRef = ref(null);
const asideRef = ref(null);

function onMenuSelect() {
  // index, indexPath, item, routeResult
  if (isMobile.value) {
    drawerModelValue.value = false;
  }
}
</script>

<style lang="scss" scoped>
.logo-title-enter-active,
.logo-title-leave-active {
  transition: all 0.3s ease;
}
.logo-title-enter-to,
.logo-title-leave-from {
  // 为了解决无法过渡到auto
  width: 100px;
}

.logo-title-enter-from,
.logo-title-leave-to {
  // opacity: 0;
  width: 0;
  // height: 0;
}
.el-aside {
  width: auto;
  &.is-collapse {
    // width: calc(
    //   var(--el-menu-icon-width) + var(--el-menu-base-level-padding) * 2
    // );
  }
}
.default-layout {
  :deep(.aside-drawer) {
    --el-dialog-padding-primary: 0;
  }
}
.el-scrollbar {
  :deep(.el-scrollbar__view) {
    min-height: 100%;
    // background: red;
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
  }
  // .el-main {
  //   // 因为父元素min-height:100%;导致子元素无法使用百分比的高度；这里使用flex实现
  //   // min-height: 100%;
  //   // background: rgba(0, 0, 0, 0.5);
  //   display: flex;
  //   flex-direction: column;
  //   flex: 1 0 auto;
  // }
}

.dark {
  // :deep()
  .el-container {
    // background-color: #000;
  }
}
.el-footer {
  background-color: var(--el-bg-color-page);
}
</style>
