import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CameraService } from './camera';


describe('CameraService', () => {
  let service: CameraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CameraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize camera and play video', async () => {
    // Create a mock video element
    const videoElement = document.createElement('video');

    // Spy on the play method of the video element
    const playSpy = vi.spyOn(videoElement, 'play').mockResolvedValue(undefined);

    // Call the initCamera method
    await service.initCamera(videoElement);

    // Check if the srcObject is set to a MediaStream
    expect(videoElement.srcObject).toBeInstanceOf(MediaStream);
    // Check if the play method was called
    expect(playSpy).toHaveBeenCalled();
  });
});
