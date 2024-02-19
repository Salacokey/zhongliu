import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const userUserStore = create(
  immer(function (set) {
    return {
      user: {
        name: "星河",
        age: 15,
      },
      setUserAge() {
        set((state) => {
          state.user.age++;
        });
      },
      setUserName(name) {
        set((state) => {
          state.user.name = name;
        });
      },
    };
  })
);

export default userUserStore;
