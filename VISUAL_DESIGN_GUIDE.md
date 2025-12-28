# 🎨 Visual Design Guide - Appliance Aid Hub

## 🌈 Color System

### Primary Gradient
```css
background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #EC4899 100%);
/* Indigo → Purple → Pink */
```

### Action Gradient
```css
background: linear-gradient(135deg, #F97316 0%, #FB923C 100%);
/* Orange → Light Orange */
```

### Premium Gradient
```css
background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%);
/* Purple → Indigo */
```

## 🎯 Component Styles

### Service Cards
- **Border:** 2px solid gray-100, hover → primary/30
- **Border Radius:** 24px (rounded-3xl)
- **Shadow:** Elevated on hover with 2xl shadow
- **Hover Effect:** -translate-y-2 (lift up)
- **Icon:** 80px with gradient border
- **Badge:** Gradient with pulse animation

### Product Cards
- **Image:** 224px height with zoom on hover (scale-110)
- **Border Radius:** 24px
- **Wishlist:** Floating heart icon, top-right
- **Badge:** Multiple types (Bestseller, Discount)
- **Price:** Gradient text (primary → purple)

### Buttons
- **Primary:** Solid with hover scale (1.02)
- **Hero:** Gradient with glow shadow
- **Action:** Orange gradient with glow
- **Glass:** White/80 with backdrop blur
- **Outline:** 2px border with hover fill

### Forms
- **Input Height:** 48px (h-12)
- **Border:** 2px solid
- **Border Radius:** 12px (rounded-xl)
- **Focus:** Border changes to primary
- **Labels:** Bold, gray-700

## 💫 Animation Patterns

### Entrance Animations
```typescript
// Fade + Slide Up
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}

// Staggered Children
variants={container}
initial="hidden"
whileInView="show"
viewport={{ once: true }}
```

### Hover Animations
```typescript
// Scale + Lift
hover:scale-105 hover:-translate-y-2

// Glow Effect
hover:shadow-[0_0_30px_rgba(79,70,229,0.5)]

// Spring Animation
whileHover={{ scale: 1.1, rotate: 5 }}
transition={{ type: "spring", stiffness: 300 }}
```

### Background Animations
```typescript
// Pulsing Orbs
animate={{ 
  scale: [1, 1.2, 1],
  opacity: [0.3, 0.5, 0.3],
}}
transition={{ duration: 8, repeat: Infinity }}
```

## 🎭 Glassmorphism

### Glass Card
```css
background: rgba(255, 255, 255, 0.95);
backdrop-filter: blur(20px);
border: 2px solid rgba(255, 255, 255, 0.5);
box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
```

### Glass Button
```css
background: rgba(255, 255, 255, 0.8);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.2);
```

## 📐 Spacing System

### Container
- **Max Width:** 1280px
- **Padding:** px-4 sm:px-6 lg:px-8

### Section Spacing
- **Vertical:** py-20 (80px)
- **Between Elements:** mb-16 (64px)
- **Card Gap:** gap-8 (32px)

### Card Padding
- **Small:** p-5 (20px)
- **Medium:** p-6 (24px)
- **Large:** p-8 (32px)

## 🔤 Typography

### Headings
```css
/* Hero Title */
font-size: 3.75rem; /* 60px */
font-weight: 900; /* black */
line-height: 1.2;

/* Section Title */
font-size: 3rem; /* 48px */
font-weight: 800; /* extrabold */

/* Card Title */
font-size: 1.25rem; /* 20px */
font-weight: 700; /* bold */
```

### Body Text
```css
/* Large */
font-size: 1.25rem; /* 20px */
line-height: 1.75;

/* Regular */
font-size: 1rem; /* 16px */
line-height: 1.5;

/* Small */
font-size: 0.875rem; /* 14px */
line-height: 1.5;
```

## 🎨 Badge Styles

### Popular Badge
```css
background: linear-gradient(to right, #F59E0B, #F97316);
color: white;
font-weight: bold;
padding: 0.5rem 1rem;
border-radius: 9999px;
animation: pulse;
```

### Discount Badge
```css
background: linear-gradient(to right, #10B981, #059669);
color: white;
font-weight: bold;
```

### Out of Stock Badge
```css
background: linear-gradient(to right, #EF4444, #F43F5E);
color: white;
font-weight: bold;
backdrop-filter: blur(4px);
```

## 🌟 Shadow System

### Card Shadow
```css
box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05), 
            0 2px 4px -2px rgb(0 0 0 / 0.05);
```

### Elevated Shadow
```css
box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.08), 
            0 4px 6px -4px rgb(0 0 0 / 0.05);
```

### Float Shadow
```css
box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 
            0 8px 10px -6px rgb(0 0 0 / 0.05);
```

### Glow Shadow
```css
box-shadow: 0 0 20px rgba(79, 70, 229, 0.3);
```

## 📱 Responsive Breakpoints

```css
/* Mobile First */
default: 0px - 639px

/* Tablet */
sm: 640px

/* Desktop */
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

## 🎯 Interactive States

### Button States
- **Default:** Base style
- **Hover:** scale-105, shadow-xl
- **Active:** scale-95
- **Disabled:** opacity-50, pointer-events-none

### Card States
- **Default:** border-gray-100
- **Hover:** border-primary/30, -translate-y-2, shadow-2xl

### Input States
- **Default:** border-2
- **Focus:** border-primary, ring-2
- **Error:** border-red-500, bg-red-50

## 🎨 Icon Sizes

- **Small:** h-4 w-4 (16px)
- **Medium:** h-5 w-5 (20px)
- **Large:** h-6 w-6 (24px)
- **XLarge:** h-8 w-8 (32px)
- **Feature:** h-10 w-10 (40px)

## 🌈 Gradient Text

```css
background: linear-gradient(to right, #4F46E5, #7C3AED);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```

## 💎 Premium Effects

### Shimmer Effect
```css
@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}

background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
background-size: 1000px 100%;
animation: shimmer 2s infinite;
```

### Float Effect
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

animation: float 3s ease-in-out infinite;
```

## 🎬 Page Transitions

### Fade In
```typescript
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.5 }}
```

### Slide Up
```typescript
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
```

### Scale In
```typescript
initial={{ opacity: 0, scale: 0.9 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ duration: 0.5 }}
```

---

## 🚀 Usage Examples

### Premium Service Card
```tsx
<Card className="group relative overflow-hidden border-2 border-gray-100 hover:border-primary/30 rounded-3xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-white">
  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
  {/* Content */}
</Card>
```

### Glass Button
```tsx
<Button variant="glass" size="xl" className="rounded-2xl shadow-2xl">
  Book a Service
</Button>
```

### Animated Section
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  {/* Content */}
</motion.div>
```

---

**Design System Version:** 2.0
**Last Updated:** 2024
**Status:** ✅ Production Ready
