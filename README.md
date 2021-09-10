#### store使用说明
```
+ getter使用

  import { mapGetters } from 'vuex'
  computed: {
    ...mapGetters([
      'getIdentity', // getters中对应的命名
    ])
  }

  使用方式：this.getIdentity
  communityList: this.$store.getters.getCommunityLists
  
+ actions使用

  import { mapActions } from 'vuex'
  methods: {
  	...mapActions('user', ['setIdentity']), // user是modules中对应的文件名，setIdentity是user中actions中存在的方法
  },
  
  使用方式： this.setIdentity()
```