function ImageGallery({ imageUrls }) {
    return (
      <>
        {imageUrls.map((url) => (
          <img key={url} src={url} alt="Uploaded" />
        ))}
      </>
    );
  }
  
  export default ImageGallery;
  