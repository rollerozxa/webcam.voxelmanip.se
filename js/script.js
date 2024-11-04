const videoElement = document.getElementById('webcam');
const statusElement = document.getElementById('status');

async function startWebcam() {
	try {
		const stream = await navigator.mediaDevices.getUserMedia({
			video: {
				width: { ideal: 1920 },
				height: { ideal: 1080 },
				facingMode: "user"
			}
		});

		videoElement.srcObject = stream;
		videoElement.style.display = "block";
		document.getElementById('webcam-preparation').style.display = "none";
		statusElement.style.display = "none";
	} catch (error) {
		console.error('Error accessing webcam:', error);

		showError(error);
	}
}

function showError(error) {
	const message = {
		'NotAllowedError': 'Permission denied. Please allow webcam access.',
		'NotFoundError': 'No camera found. Please connect a camera.',
		'NotReadableError': 'Camera is being used by another application.',
		'SecurityError': 'Page must be served over HTTPS or from localhost.'
	}[error.name] || 'Failed to access webcam. Check permissions and settings.';

	statusElement.innerText = message;
}

document.getElementById('activate-webcam').addEventListener('click', startWebcam);
