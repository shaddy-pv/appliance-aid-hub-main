# 🚀 Quick Reference - Premium UI Components

## 🎨 Common Patterns

### Premium Card
```tsx
<Card className="group relative overflow-hidden border-2 border-gray-100 hover:border-primary/30 rounded-3xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-white">
  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
  <CardContent className="p-8 relative">
    {/* Your content */}
  </CardContent>
</Card>
```

### Glass Card
```tsx
<Card className="bg-white/95 backdrop-blur-xl border-2 border-white/50 shadow-2xl rounded-3xl">
  <CardContent className="p-8">
    {/* Your content */}
  </CardContent>
</Card>
```

### Gradient Button
```tsx
<Button variant="hero" size="xl" className="rounded-2xl shadow-2xl">
  <Icon className="h-5 w-5 mr-2" />
  Button Text
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
  {/* Your content */}
</motion.div>
```

### Staggered Grid
```tsx
<motion.div 
  variants={container}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true }}
  className="grid grid-cols-1 md:grid-cols-3 gap-8"
>
  {items.map((item) => (
    <motion.div key={item.id} variants={item}>
      {/* Card content */}
    </motion.div>
  ))}
</motion.div>

// Define variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};
```

### Gradient Text
```tsx
<h1 className="text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
  Your Heading
</h1>
```

### Badge with Gradient
```tsx
<Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 shadow-lg font-bold">
  <Icon className="h-3 w-3 mr-1" />
  Popular
</Badge>
```

### Premium Input
```tsx
<div>
  <Label className="text-sm font-bold text-gray-700">Label</Label>
  <Input 
    className="h-12 rounded-xl border-2 focus:border-primary mt-2"
    placeholder="Placeholder"
  />
</div>
```

### Icon with Gradient Border
```tsx
<div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 p-1">
  <img 
    src={iconUrl} 
    alt="Icon"
    className="w-full h-full rounded-xl object-cover"
  />
</div>
```

### Animated Background Orb
```tsx
<motion.div 
  className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl"
  animate={{ 
    scale: [1, 1.2, 1],
    opacity: [0.3, 0.5, 0.3],
  }}
  transition={{ duration: 8, repeat: Infinity }}
/>
```

### Hover Scale Button
```tsx
<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
>
  <Icon className="h-5 w-5" />
</motion.button>
```

---

## 🎨 Button Variants

```tsx
// Primary (default)
<Button>Default</Button>

// Hero (gradient with glow)
<Button variant="hero">Hero</Button>

// Action (orange gradient)
<Button variant="action">Action</Button>

// Premium (purple gradient)
<Button variant="premium">Premium</Button>

// Glass (transparent with blur)
<Button variant="glass">Glass</Button>

// Outline
<Button variant="outline">Outline</Button>

// Secondary
<Button variant="secondary">Secondary</Button>

// Ghost
<Button variant="ghost">Ghost</Button>
```

---

## 📏 Sizing

```tsx
// Buttons
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>

// Rounded Corners
className="rounded-xl"    // 12px
className="rounded-2xl"   // 16px
className="rounded-3xl"   // 24px

// Spacing
className="p-5"   // 20px
className="p-6"   // 24px
className="p-8"   // 32px
className="gap-6" // 24px
className="gap-8" // 32px
```

---

## 🌈 Gradients

```tsx
// Hero Gradient
className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600"

// Action Gradient
className="bg-gradient-to-r from-orange-500 to-orange-600"

// Premium Gradient
className="bg-gradient-to-r from-purple-600 to-indigo-600"

// Service Gradients
className="bg-gradient-to-br from-blue-500 to-cyan-500"
className="bg-gradient-to-br from-purple-500 to-pink-500"
className="bg-gradient-to-br from-orange-500 to-red-500"
className="bg-gradient-to-br from-green-500 to-emerald-500"
```

---

## 💫 Animations

```tsx
// Hover Effects
className="hover:scale-105 hover:-translate-y-2 transition-all duration-500"
className="hover:shadow-2xl transition-shadow duration-300"
className="hover:shadow-[0_0_30px_rgba(79,70,229,0.5)]"

// Pulse
className="animate-pulse"

// Entrance
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}

// Spring
whileHover={{ scale: 1.1, rotate: 5 }}
transition={{ type: "spring", stiffness: 300 }}
```

---

## 🎯 Common Layouts

### Page Container
```tsx
<div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
  <div className="container py-12">
    {/* Content */}
  </div>
</div>
```

### Section Header
```tsx
<div className="text-center mb-16">
  <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-2">
    <Icon className="h-4 w-4 mr-2" />
    Section Label
  </Badge>
  <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
    Section Title
  </h2>
  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
    Section description
  </p>
</div>
```

### Grid Layout
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
  {items.map((item) => (
    <Card key={item.id}>
      {/* Card content */}
    </Card>
  ))}
</div>
```

---

## 🎨 Color Classes

```tsx
// Primary
className="text-primary"
className="bg-primary"
className="border-primary"

// Secondary
className="text-secondary"
className="bg-secondary"

// Muted
className="text-muted-foreground"
className="bg-muted"

// Destructive
className="text-destructive"
className="bg-destructive"

// Success
className="text-green-600"
className="bg-green-50"
```

---

## 📱 Responsive

```tsx
// Mobile First
className="text-base md:text-lg lg:text-xl"
className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
className="p-4 md:p-6 lg:p-8"
className="gap-4 md:gap-6 lg:gap-8"
```

---

## 🔧 Utility Classes

```tsx
// Backdrop Blur
className="backdrop-blur-xl"

// Shadow
className="shadow-lg"
className="shadow-xl"
className="shadow-2xl"

// Border
className="border-2"
className="border-gray-100"

// Transition
className="transition-all duration-300"
className="transition-all duration-500"

// Overflow
className="overflow-hidden"

// Position
className="relative"
className="absolute inset-0"
```

---

## 💡 Pro Tips

1. **Always use `group` for parent hover effects**
   ```tsx
   <div className="group">
     <div className="group-hover:opacity-100">...</div>
   </div>
   ```

2. **Use `relative` and `absolute` for overlays**
   ```tsx
   <div className="relative">
     <div className="absolute inset-0">Overlay</div>
   </div>
   ```

3. **Combine transitions for smooth effects**
   ```tsx
   className="transition-all duration-500 hover:scale-105 hover:-translate-y-2"
   ```

4. **Use `viewport={{ once: true }}` to prevent re-animation**
   ```tsx
   <motion.div viewport={{ once: true }}>...</motion.div>
   ```

5. **Stack gradients for depth**
   ```tsx
   <div className="bg-gradient-to-br from-primary/5 via-transparent to-transparent">
   ```

---

## 📚 Import Statements

```tsx
// Components
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Icons
import { Icon } from "lucide-react";

// Animation
import { motion } from "framer-motion";

// Hooks
import { useState } from "react";
import { useNavigate } from "react-router-dom";
```

---

**Quick Reference Version:** 1.0
**Last Updated:** 2024
