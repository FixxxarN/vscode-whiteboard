export const exportCanvas = (canvas) => {
  const downloadLink = document.createElement('a');

  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);

    downloadLink.setAttribute('download', 'whiteboard.png');
    downloadLink.setAttribute('href', url);
    downloadLink.click();
  });
}