<script setup lang="ts">
    import { onMounted, ref } from "vue";

    interface RestaurantItem {
        value: string;
    }

    const restaurants = ref<RestaurantItem[]>([]);
    const querySearch = (queryString: string, cb: any) => {
        const results = queryString
            ? restaurants.value.filter(createFilter(queryString))
            : restaurants.value;
        // call callback function to return suggestions
        cb(results);
    };
    // 根据需要可以改为模糊搜索
    const createFilter = (queryString: string) => {
        return (restaurant: RestaurantItem) => {
            return (
                restaurant.value
                    .toLowerCase()
                    .indexOf(queryString.toLowerCase()) === 0
            );
        };
    };

    // 预先加载所有的名称
    const loadAll = () => {
        return [
            { value: "vue" },
            { value: "element" },
            { value: "cooking" },
            { value: "mint-ui" },
            { value: "vuex" },
        ];
    };

    const text = ref("");
    const handleSearch = (searchText: string = text.value) => {
        console.log(searchText);
        // 调用函数指向相关页面
    };

    onMounted(() => {
        restaurants.value = loadAll();
    });
</script>

<template>
    <div class="searchbarWrapper">
        <el-autocomplete
            class="searchbar"
            v-model="text"
            :fetch-suggestions="querySearch"
            :trigger-on-focus="false"
            placeholder="搜索商品"
            clearable
            @select="(item:RestaurantItem)=>handleSearch(item.value)"
            @keyup.enter="() => handleSearch()"
        />
    </div>
</template>

<style lang="scss">
    .el-autocomplete {
        width: 300px;
        .el-input__wrapper {
            border-radius: 10px 10px;
        }
    }
</style>
