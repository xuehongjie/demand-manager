<template>
  <d2-container class="page-home"></d2-container>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.page-home {
  .project-wrapper {
    float: left;
    width: 160px;
    margin-right: 10px;
    margin-bottom: 10px;
    font-size: 0;
    &::after {
      content: '';
      clear: both;
    }
    .project-image {
      width: 100%;
      height: 160px;
    }
    .project-info {
      padding: 5px 8px;
      font-size: 12px;
    }
    .button-edit {
      padding: 0;
    }
  }
  .project-add {
    .project-image {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f6f6f6;
    }
    /* 加号 */
    .el-icon-plus {
      color: #ccc;
      font-size: 80px;
    }
    .project-info {
      text-align: center;
    }
  }
}
</style>
