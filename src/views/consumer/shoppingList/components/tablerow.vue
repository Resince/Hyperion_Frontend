<script setup lang="ts">
    import { ref } from "vue";
    import { ElButton, ElCheckbox } from "element-plus";
    import { Delete } from "@element-plus/icons-vue";
    import { IShoppingListItem } from "@/types/shoppingList";
    import { watch } from "vue";
    const selected = ref(false);
    const selectedGoods = defineModel("selectedGoods", {
        type: Set<number>,
        default: new Set(),
    });
    const props = defineProps<{
        row: IShoppingListItem;
    }>();
    const emit = defineEmits<{
        (e: "handleClickGood", id: number): void;
        (e: "handleClickDelete", id: number): void;
    }>();
    const handleSelected = () => {
        if (selected.value) {
            selectedGoods.value.add(props.row.id);
        } else {
            for (let item of selectedGoods.value) {
                if (item === props.row.id) {
                    selectedGoods.value.delete(item);
                }
            }
        }
    };
    watch(
        () => selectedGoods.value.has(props.row.id),
        () => {
            if (selectedGoods.value.has(props.row.id)) {
                selected.value = true;
            } else {
                selected.value = false;
            }
        }
    );
</script>

<template>
    <div class="tableview-row">
        <el-checkbox
            v-model="selected"
            size="large"
            class="selectall"
            @change="handleSelected"
        />
        <div
            class="product-cell image"
            @click="emit('handleClickGood', props.row.id)"
        >
            <img
                :src="props.row.coverUrl"
                alt=""
            />
            <span>Ocean</span>
        </div>
        <div class="product-cell describe">{{ props.row.name }}</div>
        <div class="product-cell singlePrice">{{ props.row.price }}</div>
        <div class="product-cell quantity">{{ props.row.quantity }}</div>
        <div class="product-cell price">￥{{ props.row.price }}</div>
        <div class="product-cell action">
            <el-button
                type="danger"
                :icon="Delete"
                circle
                @click="emit('handleClickDelete', props.row.id)"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .tableview-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 7px;
        flex-direction: row;
        margin: 5px 0px;
        &:hover {
            box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
            background-color: #fff;
        }
    }
    .product-cell {
        display: flex;
        padding-top: 10px;
        padding-bottom: 10px;
        font-size: 16px;
        align-items: center;
        img {
            width: 70px;
            height: 50px;
            border-radius: $cus_radius;
            object-fit: cover;
        }
        &.image {
            display: flex;
            align-items: center;
            span {
                margin-left: 10px;
            }
        }
        &.action {
            display: flex;
            justify-content: center;
            gap: 20px;
        }
    }
</style>
