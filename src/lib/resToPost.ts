export const resToPost = (res: any) => {
  return {
    id: res.id,
    title: res.title,
    content: res.content,
    username: res.user.username,
  };
};
