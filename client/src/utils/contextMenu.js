export const handlePosition = (contextMenuRef, clientX, clientY) => {
  // if (clientX + 200 + 50 >= window.innerWidth)
  //   clientX = window.innerWidth - (200 + 50);

  if (contextMenuRef?.current && clientX && clientY) {
    console.log("xxxxx=========xxxxxxxxx=xxxxxxxxxxx=xxxxxxxxxxx========");
    const { clientWidth, clientHeight } = contextMenuRef.current;
    if (clientX + clientWidth + 50 >= window.innerWidth)
      clientX = window.innerWidth - (50 + clientWidth);

    console.log("clientHeight == " + clientHeight);
    console.log("clientY == " + clientY);
    console.log("window.innerHeight == " + window.innerHeight);
    console.log(
      "clientY + clientHeight + 50 >= window.innerHeight == " +
        clientY +
        clientHeight +
        50 >=
        window.innerHeight
    );

    if (clientY + clientHeight + 50 >= window.innerHeight)
      clientY = window.innerHeight - (50 + clientHeight);
  }
  return { clientX, clientY };
};
