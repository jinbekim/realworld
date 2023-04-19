import { reactive } from "vue";

export const usePagination = () => {
  const pagination = reactive({
    total: 0,
    limit: 10,
    offset: 0,
  });

  const onClickPage = (page: number) => {
    pagination.offset = page * pagination.limit;
  };

  return {
    pagination,
    onClickPage,
  };
};
