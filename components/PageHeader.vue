<template>
  <el-page-header
    @back="$emit('update:collapse', !props.collapse)"
    class="h-full"
  >
    <template #icon>
      <el-icon :size="20">
        <el-icon-Expand v-if="props.collapse" />
        <el-icon-Fold v-else />
      </el-icon>
    </template>
    <template #title><span></span></template>
    <template #content>
      <!-- <div class="">{{ atciveMenu }}</div> -->
      <el-breadcrumb v-if="!isMobile" separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item
          v-for="(item, index) in menus.currentRouteMenus"
          :key="index"
          >{{ item.menu.title }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </template>
    <template #extra>
      <div class="flex items-center justify-center">
        <button
          class="dark-switch el-switch border-none bg-transparent"
          :class="{ 'is-checked': isDark }"
          @click="toggleDark()"
          role="switch"
        >
          <el-switch class="hidden">
            <!-- 为了自动载入el-switch样式 -->
          </el-switch>
          <div class="el-switch__core">
            <div class="el-switch__action">
              <el-icon>
                <el-icon-moon v-if="isDark" />
                <el-icon-sunny v-else />
              </el-icon>
            </div>
          </div>
        </button>
        <!-- <el-icon><el-icon-sunny /></el-icon>
        <el-icon><el-icon-moon /></el-icon> -->
        <el-divider direction="vertical" />
        <el-popover trigger="click" width="320px">
          <template #reference>
            <el-avatar :size="32" :src="auth.user?.avatar" class="ml-2">
              <el-icon :size="16">
                <el-icon-avatar></el-icon-avatar>
              </el-icon>
            </el-avatar>
          </template>
          <!-- <span> Some content </span> -->
          <div class="flex user-card">
            <div class="flex-auto flex items-center">
              <div class="">
                <el-avatar :size="60" :src="auth.user?.avatar">
                  <el-icon :size="30">
                    <el-icon-avatar></el-icon-avatar>
                  </el-icon>
                </el-avatar>
              </div>
              <div class="ml-2">
                <div class="">{{ auth.user?.name }}</div>
                <!-- <div class="">{{ auth.user?.phone }}</div> -->
                <!-- <div class="">{{ auth.user?.roles }}</div> -->
              </div>
            </div>
            <div class="flex-none">
              <el-menu
                class="h-full border-r-0 user-card-menu"
                :default-active="useRoute().path"
              >
                <nuxt-link to="/userinfo" custom v-slot="{ navigate, href }">
                  <el-menu-item :href="href" @click="navigate" :index="href">
                    <el-icon size="16">
                      <el-icon-user></el-icon-user>
                    </el-icon>
                    <span>个人中心</span>
                  </el-menu-item>
                </nuxt-link>

                <el-menu-item index="">
                  <el-icon size="16">
                    <el-icon-setting></el-icon-setting>
                  </el-icon>
                  <span>用户设置</span>
                </el-menu-item>
                <!-- <hr /> -->
                <!-- <div class="flex-auto"></div> -->
                <el-divider class="my-1"></el-divider>
                <el-menu-item @click="signOut" index="">
                  <el-icon size="16">
                    <!-- <el-icon-out></el-icon-out> -->
                    <icon name="octicon:sign-out"></icon>
                  </el-icon>
                  <span>退出登录</span>
                </el-menu-item>
              </el-menu>
            </div>
          </div>
        </el-popover>
        <!-- <el-button type="primary" size="default"> </el-button> -->
        <!-- <el-dropdown>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>用户设置</el-dropdown-item>
            <el-dropdown-item divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown> -->
      </div>
    </template>
    <template v-if="isMobile" #default>
      <el-breadcrumb separator="/" class="mt-2">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item
          v-for="(item, index) in menus.currentRouteMenus"
          :key="index"
          >{{ item.menu.title }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </template>
  </el-page-header>
</template>

<script setup lang="ts">
const isMobile = useMediaQuery('(max-width: 768px)');
const props = defineProps(['collapse']);
defineEmits(['update:collapse']);
// const auth = useAuth();

function signOut() {
  // auth.signOut();
  useRouter().push('/signIn');
}
const route = useRoute();
const router = useRouter();
// const menus = useMenus();
const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<style scoped lang="scss">
.user-card-menu {
  --el-menu-item-height: 24px;
  .el-menu-item {
  }
}
.dark-switch {
  --el-switch-on-color: var(--el-border-color);
}
</style>
