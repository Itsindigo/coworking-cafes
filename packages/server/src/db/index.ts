export const db = {
  user: {
    findMany: () => {
      return [{ id: 1, name: "matt" }];
    },
    findById(id: string) {
      return { id, name: "matt" };
    },
    create({ name }: { name: string }) {
      return { id: 1, name };
    },
  },
};
