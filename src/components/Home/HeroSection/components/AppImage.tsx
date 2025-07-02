

function Img({
  src,
  alt = "Image Name",
  className = "",
  ...props
}) {

  return (
    <Image
      src={src}
      alt={alt}
      width={1080}
      height={1080}
      className={className}
      onError={(e) => {
        e.target.src = "/assets/images/no_image.png"
      }}
      {...props}
    />
  );
}

export default Image;
