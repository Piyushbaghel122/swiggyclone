from fastapi import APIRouter, UploadFile, File
from app.services.imageKit import get_auth_params, upload_file

router = APIRouter(
    prefix="/api/imagekit",
    tags=["ImageKit"]
)


@router.get("/auth")
def get_imagekit_auth():
    """
    Returns ImageKit authentication parameters (token, expire, signature)
    required for client-side uploads.
    """
    return get_auth_params()


@router.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    """
    Endpoint to upload an image file directly through the backend.
    """
    file_bytes = await file.read()
    response = upload_file(
        file=file_bytes,
        file_name=file.filename or "upload.jpg",
        folder="/products"
    )
    return {
        "file_id": response.file_id,
        "url": response.url,
        "name": response.name
    }
