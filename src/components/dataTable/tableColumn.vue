<script lang="tsx" setup>
    import { useStore } from "@/store";
    import { JSX } from "vue/jsx-runtime";
    const props = defineProps<{
        title: string;
        width: string;
        label: string;
        filter?: [];
    }>();
    const store = useStore();
    // 插槽函数，用于对子组件传递的插槽进行定义
    const slots = defineSlots<{
        default(props: { row: any }): JSX.Element;
    }>();
    // 负责接收父组件的数据以及收集插槽的数据
    // 传入的数据为{row,column}
    const collectCell = (row: any) => {
        let children = null;
        if (slots.default) {
            // 如果插槽存在，那么就渲染插槽
            // 传入的数据为：data
            children = slots.default({ row: row });
        } else {
            // 仅仅渲染列对应的数据
            children = <span style={{}}>{row[props.label]}</span>;
        }
        return children;
    };
    // 利用收集的数据渲染表格的cell
    const renderCell = (row: any) => {
        const children = collectCell(row);
        return <div>{children}</div>;
    };
    // 将数据传入store
    let item: {
        title: string;
        width: string;
        label: string;
        filter?: [];
        renderCell?: (row: any) => JSX.Element;
    } = {
        title: props.title,
        width: props.width,
        label: props.label,
        filter: props.filter,
    };
    item.renderCell = renderCell;
    store.commit("tableStoreModule/pushColumns", item);
</script>

<template></template>
