// assets/content-map.js
// Content map for site sections, keyword tags, and search filtering

const contentMap = {
  siteUrl: "https://mainindex-hth.com.cn",
  primaryKeyword: "华体会",
  sections: [
    {
      id: "home",
      title: "首页",
      tags: ["华体会", "首页", "导航"],
      keywords: ["华体会首页", "体育入口", "首页展示"],
      items: [
        { title: "华体会体育入口", link: "/sports", tags: ["体育", "入口", "华体会"] },
        { title: "华体会资讯中心", link: "/news", tags: ["资讯", "华体会", "新闻"] }
      ]
    },
    {
      id: "sports",
      title: "体育赛事",
      tags: ["华体会", "体育", "赛事"],
      keywords: ["足球", "篮球", "网球", "华体会体育"],
      items: [
        { title: "足球联赛", link: "/sports/football", tags: ["足球", "联赛", "华体会"] },
        { title: "篮球锦标赛", link: "/sports/basketball", tags: ["篮球", "锦标赛"] },
        { title: "网球公开赛", link: "/sports/tennis", tags: ["网球", "公开赛"] }
      ]
    },
    {
      id: "esports",
      title: "电子竞技",
      tags: ["华体会", "电竞", "竞赛"],
      keywords: ["LOL", "DOTA2", "CSGO", "华体会电竞"],
      items: [
        { title: "英雄联盟赛事", link: "/esports/lol", tags: ["LOL", "英雄联盟"] },
        { title: "DOTA2国际邀请赛", link: "/esports/dota2", tags: ["DOTA2", "邀请赛"] }
      ]
    },
    {
      id: "promotions",
      title: "优惠活动",
      tags: ["华体会", "优惠", "活动"],
      keywords: ["注册奖励", "充值优惠", "华体会活动"],
      items: [
        { title: "新用户注册礼包", link: "/promotions/new-user", tags: ["新用户", "礼包"] },
        { title: "充值返利活动", link: "/promotions/recharge", tags: ["充值", "返利"] }
      ]
    }
  ]
};

/**
 * Search sections by keyword or tag
 * @param {string} query - search term
 * @param {string} [field='all'] - 'title', 'tags', 'keywords', or 'all'
 * @returns {Array} matched items
 */
function searchContent(query, field = "all") {
  if (!query || query.trim() === "") return [];
  const lowerQuery = query.toLowerCase().trim();
  const results = [];

  contentMap.sections.forEach(section => {
    section.items.forEach(item => {
      let match = false;
      if (field === "all" || field === "title") {
        if (item.title.toLowerCase().includes(lowerQuery)) match = true;
      }
      if (field === "all" || field === "tags") {
        if (item.tags.some(tag => tag.toLowerCase().includes(lowerQuery))) match = true;
      }
      if (field === "all" || field === "keywords") {
        if (section.keywords.some(kw => kw.toLowerCase().includes(lowerQuery))) match = true;
      }
      if (match) {
        results.push({
          sectionId: section.id,
          sectionTitle: section.title,
          item: item
        });
      }
    });
  });

  return results;
}

/**
 * Get all items tagged with a specific keyword
 * @param {string} tag - tag to filter
 * @returns {Array} items with that tag
 */
function getItemsByTag(tag) {
  if (!tag || tag.trim() === "") return [];
  const lowerTag = tag.toLowerCase().trim();
  const tagged = [];

  contentMap.sections.forEach(section => {
    section.items.forEach(item => {
      if (item.tags.some(t => t.toLowerCase() === lowerTag)) {
        tagged.push({
          sectionId: section.id,
          sectionTitle: section.title,
          item: item
        });
      }
    });
  });

  return tagged;
}

/**
 * Get all items containing the primary keyword
 * @returns {Array} items referencing primary keyword
 */
function getPrimaryKeywordItems() {
  return getItemsByTag(contentMap.primaryKeyword);
}

// Example usage (commented out for modular use)
// console.log("Search for '篮球':", searchContent("篮球"));
// console.log("Items tagged '华体会':", getItemsByTag("华体会"));
// console.log("Primary keyword items:", getPrimaryKeywordItems());

export { contentMap, searchContent, getItemsByTag, getPrimaryKeywordItems };