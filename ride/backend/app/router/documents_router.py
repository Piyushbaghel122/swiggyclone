from fastapi import APIRouter
from app.controller.documents_controller import DocumentsController

router = APIRouter(prefix="/rider/documents", tags=["Documents"])

@router.post("/upload")
def upload_document():
    return DocumentsController.upload_document()

@router.get("")
def get_documents():
    return DocumentsController.get_documents()

@router.delete("/{id}")
def delete_document():
    return DocumentsController.delete_document()

@router.post("/verify")
def verify_document():
    return DocumentsController.verify_document()

@router.get("/history")
def documents_history():
    return DocumentsController.documents_history()
