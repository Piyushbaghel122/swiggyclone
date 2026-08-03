import os
from typing import List, Optional, Any
from imagekitio import ImageKit

URL_ENDPOINT = os.environ.get("IMAGEKIT_URL_ENDPOINT")

imagekit = ImageKit(
    private_key=os.environ.get("IMAGEKIT_PRIVATE_KEY")
)


def get_auth_params():
    """
    Returns authentication parameters (token, expire, signature)
    required for client-side file uploading to ImageKit.
    """
    return imagekit.helper.get_authentication_parameters()


def upload_file(
    file: Any,
    file_name: str,
    folder: str = "/products",
    tags: Optional[List[str]] = None
):
    """
    Uploads a file to ImageKit.
    
    :param file: Can be file path (str/Path), bytes, or a file-like object (e.g., from FastAPI UploadFile.file).
    :param file_name: Name of the file to save in ImageKit.
    :param folder: Target folder in ImageKit.
    :param tags: Optional list of tags.
    """
    kwargs = {
        "file": file,
        "file_name": file_name,
        "folder": folder,
    }
    if tags:
        kwargs["tags"] = tags
        
    return imagekit.files.upload(**kwargs)


def build_transformed_url(
    src: str,
    width: int = 800,
    height: int = 600,
    format: str = "webp"
) -> str:
    """
    Builds an ImageKit URL with basic transformations applied.
    """
    return imagekit.helper.build_url(
        url_endpoint=URL_ENDPOINT,
        src=src,
        transformation=[{
            "width": width,
            "height": height,
            "format": format
        }]
    )