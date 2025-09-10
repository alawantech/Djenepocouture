import React, { useState, useRef, useCallback } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import './ImageCropper.css';
import { X, Check, RotateCcw } from 'lucide-react';

const ImageCropper = ({ imageSrc, onCropComplete, onCancel, onSkipCrop }) => {
  const [crop, setCrop] = useState({
    unit: '%',
    width: 80,
    height: 80,
    x: 10,
    y: 10,
    aspect: 1, // Square aspect ratio for product images
  });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef(null);
  const canvasRef = useRef(null);

  const onLoad = useCallback((img) => {
    imgRef.current = img;
    setImageLoaded(true);
  }, []);

  const getCroppedImg = useCallback(() => {
    if (!completedCrop || !imgRef.current || !canvasRef.current || !imageLoaded) {
      console.log('Missing requirements for crop:', { 
        completedCrop: !!completedCrop, 
        imgRef: !!imgRef.current, 
        canvasRef: !!canvasRef.current,
        imageLoaded 
      });
      return;
    }

    const image = imgRef.current;
    const canvas = canvasRef.current;
    const crop = completedCrop;

    // Ensure image is fully loaded
    if (!image.complete || image.naturalWidth === 0) {
      console.error('Image not fully loaded');
      return;
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio || 1;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    try {
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width * scaleX,
        crop.height * scaleY,
      );
    } catch (error) {
      console.error('Error drawing image to canvas:', error);
      return;
    }

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            console.error('Canvas is empty');
            return;
          }
          blob.name = 'cropped-image.jpg';
          resolve(blob);
        },
        'image/jpeg',
        0.85
      );
    });
  }, [completedCrop, imageLoaded]);

  const handleCropComplete = async () => {
    try {
      const croppedImageBlob = await getCroppedImg();
      if (croppedImageBlob) {
        // Convert blob to file
        const croppedFile = new File([croppedImageBlob], 'cropped-image.jpg', {
          type: 'image/jpeg',
        });
        onCropComplete(croppedFile);
      }
    } catch (error) {
      console.error('Error cropping image:', error);
    }
  };

  const resetCrop = () => {
    setCrop({
      unit: '%',
      width: 80,
      height: 80,
      x: 10,
      y: 10,
      aspect: 1,
    });
  };

  return (
    <div className="image-cropper-overlay">
      <div className="image-cropper-modal">
        <div className="cropper-header">
          <h3>Crop Product Image</h3>
          <p>Drag to adjust the crop area, or skip to use the original image.</p>
        </div>

        <div className="cropper-container">
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={1}
            minWidth={50}
            minHeight={50}
          >
            <img
              ref={imgRef}
              alt="Crop preview"
              src={imageSrc}
              onLoad={(e) => onLoad(e.target)}
              className="cropper-image"
              style={{ maxWidth: '100%', maxHeight: '400px' }}
            />
          </ReactCrop>
        </div>

        <canvas
          ref={canvasRef}
          style={{ display: 'none' }}
        />

        <div className="cropper-actions">
          <button
            type="button"
            onClick={resetCrop}
            className="btn-cropper btn-reset"
          >
            <RotateCcw size={18} />
            Reset
          </button>
          
          <div className="cropper-main-actions">
            <button
              type="button"
              onClick={onCancel}
              className="btn-cropper btn-cancel"
            >
              <X size={18} />
              Cancel
            </button>

            <button
              type="button"
              onClick={onSkipCrop}
              className="btn-cropper btn-skip"
            >
              Skip Crop
            </button>
            
            <button
              type="button"
              onClick={handleCropComplete}
              className="btn-cropper btn-confirm"
              disabled={!imageLoaded || !completedCrop}
            >
              <Check size={18} />
              Apply Crop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
