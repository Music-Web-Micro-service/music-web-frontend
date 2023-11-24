export function downloadMusic(musicResourceId: number) {
  // First, fetch the download URL from your backend
  fetch(`http://localhost:8088/MusicResource/get/download/file/${musicResourceId}`)
    .then((response) => response.text()) // <-- Change this line to handle the response as text
    .then((musicResourceUrl) => {
      if (!musicResourceUrl) {
        throw new Error("Music URL not found");
      }

      console.log(`${musicResourceUrl}`);
      // Then, use the fetched URL to initiate the download
      const a = document.createElement("a");
      a.href = musicResourceUrl;
      a.download = ""; // This will make the browser use the file's original name. You can also specify a name here if you wish.
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    })
    .catch((error) => console.error("Music download error:", error));
}
