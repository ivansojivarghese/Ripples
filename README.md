# Ripples

![Demo](Files/demo.gif)

An interactive JavaScript project that replicates the mesmerizing effect of ripples in water.

## Physics of Ripples

When an object is dropped into calm water, two types of waves are formed:

- **Capillary Waves (cW)**: These are the first waves to form, creating a dense grouping known as the **Leading Edge** as the ripple radiates outward.

- **Gravity Waves (gW)**: Larger and seemingly slower than capillary waves, they are generated in smaller quantities.

Capillary waves are the first to form and create a dense grouping known as the Leading Edge as the ripple radiates outward. Gravity waves are larger and appear slower than capillary waves, forming in smaller quantities.

### Buffer Zone

The buffer zone is the area within the first radiating gravity wave where no capillary waves are visible, though they are still propagating alongside the gravity wave.

### Release Zone

The release zone is the point where all capillary waves become visible. The area between the buffer and release zones, divided by the number of capillary waves, forms percentile markers relative to the gravity wave’s live height tracking for individual capillary waves to show up.

Faster clicks generate faster ripple wave speeds, reducing the buffer zone and increasing the release zone.

This allows more space for high-speed waves to display their radiating and fading-out effects.

## Features

- Realistic water ripple effect
- Interactive click and touch-based ripple generation
- Adjustable ripple intensity and speed
- Optimized performance using WebGL

## Technologies Used

- JavaScript (ES6+)
- WebGL / GLSL Shaders
- HTML5 Canvas
- CSS for UI elements

## Installation

1. Clone the repository:

   ```bash
   git clone <repo-url>

2. Open 'index.html' in a browser to run the simulation.

## Usage
- Click or tap on the canvas to create ripple effects.
- Adjust intensity and speed with a longer click/tap.

## Future Improvements 
- Simulate secondary waves from primary wave collisions. When two or more ripples intersect, they generate smaller secondary waves due to constructive and destructive interference. This effect adds realism by replicating the way real water waves behave when they merge and interact.
- Add mobile touch gestures for enhanced interaction.
- Implement a settings UI for user-configurable parameters.
- Improve performance on lower-end devices.

## License
This project is licensed under the MIT License.

## Credits
Developed by Ivan Varghese.
