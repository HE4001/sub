<template>
  <div>
    <h2>Surge 订阅转换器</h2>
    <input v-model="subUrl" placeholder="输入 Surge 订阅 URL" style="width: 300px;" />
    <button @click="generateConfig">生成配置</button>
    <textarea v-model="config" rows="10" cols="50" placeholder="转换后的配置将显示在这里"></textarea>
  </div>
</template>

<script>
import { fetchRules } from './rules-fetcher';
import { generateConfig } from './api';

export default {
  data() {
    return {
      subUrl: '',  // 用户输入的订阅 URL
      config: '',  // 转换后的配置
      rules: null  // 从 GitHub 拉取的规则
    };
  },
  async mounted() {
    try {
      this.rules = await fetchRules();  // 页面加载时拉取规则
    } catch (error) {
      console.error('拉取规则文件失败:', error);
    }
  },
  methods: {
    async generateConfig() {
      try {
        this.config = await generateConfig(this.subUrl, this.rules);  // 调用 API 生成配置
      } catch (error) {
        this.config = '错误：无法生成配置，请检查 URL 或后端服务。';
        console.error(error);
      }
    }
  }
};
</script>
