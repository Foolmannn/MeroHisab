---
name: Zenith Finance
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#3c4a42'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#6c7a71'
  outline-variant: '#bbcabf'
  surface-tint: '#006c49'
  primary: '#006c49'
  on-primary: '#ffffff'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#4edea3'
  secondary: '#0058be'
  on-secondary: '#ffffff'
  secondary-container: '#2170e4'
  on-secondary-container: '#fefcff'
  tertiary: '#855300'
  on-tertiary: '#ffffff'
  tertiary-container: '#e29100'
  on-tertiary-container: '#523200'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  h1:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  h2:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: 0.05em
  caption:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-margin: 24px
  gutter: 20px
  card-padding: 24px
  section-gap: 40px
  stack-xs: 4px
  stack-sm: 12px
  stack-md: 24px
---

## Brand & Style

The brand personality of this design system is centered on clarity, financial wellness, and effortless control. It targets modern professionals who seek a calm, non-intimidating relationship with their data. The emotional response should be one of "financial breathing room"—where the complexity of expenses is distilled into a serene, organized visual flow.

The aesthetic follows a **Modern Minimalist** movement with **Soft Tonal** influences. It prioritizes heavy whitespace and a reduction of visual noise to ensure the user’s financial health remains the focus. By utilizing a card-based architecture, the design system creates a sense of "physicality" and containment, making abstract numbers feel tangible and manageable.

## Colors

The palette is anchored by a vibrant emerald green, symbolizing growth and positive balance. This is supported by a functional hierarchy of accent colors: a subtle blue for informational states and an approachable orange for warnings or budget thresholds.

This design system utilizes a "Soft Dark" approach. In light mode, surfaces are pure white against a light-grey wash to create depth. In dark mode, the system avoids pure black, instead using deep navy-slates (#0f172a) to maintain legibility and reduce eye strain during late-night expense logging. Neutral tones are slightly desaturated to ensure the primary green remains the most significant focal point.

## Typography

The choice of **Manrope** provides a balanced, contemporary feel that bridges the gap between technical precision and human friendliness. 

Headlines use a tighter letter-spacing and heavier weights to establish a clear information hierarchy, while body text is given generous line-height for maximum readability during data entry. Numeric values—crucial for an expense tracker—should use the medium or semibold weights of Manrope to ensure financial figures are never overlooked.

## Layout & Spacing

This design system employs a **Fluid Grid** model with a specific focus on "Inner Breathability." Layouts are built on an 8px base unit to ensure mathematical consistency across all screens. 

The strategy relies on generous margins (24px) to push content away from the edges, creating a "framed" effect. Horizontal spacing between cards (gutters) is kept wide at 20px to prevent the UI from feeling cluttered. Vertical stacking follows a rhythmic progression (4/12/24), ensuring that related data points are grouped tightly while major modules are clearly separated.

## Elevation & Depth

Hierarchy is established through **Ambient Shadows** and **Tonal Layering** rather than heavy lines. 

- **Level 0 (Background):** The canvas. Non-interactive, flat.
- **Level 1 (Cards):** Low-offset, highly diffused shadows. Uses a 10% opacity version of the neutral-blue tint to make cards feel like they are floating just above the surface.
- **Level 2 (Active/Hover):** When a user interacts with a card or button, the shadow Y-offset increases and the blur radius doubles, simulating a physical lift.
- **Level 3 (Modals):** Large, soft-spread shadows that dim the background, creating a focused "Glassmorphism" effect where the underlying content is slightly blurred but remains visible.

## Shapes

The shape language is characterized by **Large Border Radii**, reinforcing the approachable and modern nature of the design system. 

The standard container uses a 16px (radius-md) corner, while primary cards and main dashboard modules utilize a 24px (radius-lg) corner to create a "soft-edge" aesthetic. Buttons and chips use the "Full" radius (pill-shaped) to provide a clear contrast against the rectangular cards, making interactive elements immediately recognizable.

## Components

### Buttons & Interaction
Buttons are pill-shaped and utilize high-contrast fills for primary actions. 
- **Hover State:** A subtle scale-up (1.02x) and a 10% brightness increase.
- **Active State:** A subtle scale-down (0.98x) to provide tactile feedback.

### Cards
The core of the UI. Cards must have no border in light mode, relying solely on the Level 1 shadow. In dark mode, a 1px stroke of 5% white is added to the top edge to define the silhouette against the dark background.

### Input Fields
Inputs are large (minimum 48px height) with a subtle light-gray background (#f1f5f9). On focus, the background turns white and a 2px emerald green border appears.

### Expense Chips
Small, rounded-full elements used for categorization (e.g., "Food," "Transport"). These use low-opacity versions of the primary, secondary, or tertiary colors with high-contrast text for a "glass-tint" look.

### Progress Bars
Used for budget tracking. The track is a soft, desaturated version of the neutral color, while the fill is a solid emerald green gradient. If a budget is exceeded, the fill color transitions to the tertiary orange.