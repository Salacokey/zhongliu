import userUserStore from "@/store/user";
const Lizi = () => {
  const userStore = userUserStore();
  return (
    <div>
      <h1>用户名:{userStore.user.name}</h1>
      <h1>年龄:{userStore.user.age}</h1>
      <h2>{userStore.user.info.msg}</h2>
      <button onClick={() => userStore.setUserAge()}>增加年龄</button>
      <button onClick={() => userStore.setUserName("milkway")}>
        修改用户名
      </button>
      <br />
      <button onClick={() => userStore.setInfoAsync()}>异步</button>
    </div>
  );
};
export default Lizi;
