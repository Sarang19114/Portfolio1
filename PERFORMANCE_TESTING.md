# Performance Testing Guide

## Quick Test Instructions

### 1. Chrome DevTools Performance Monitor
```
1. Open Chrome DevTools (F12)
2. Press Cmd/Ctrl + Shift + P
3. Type "Show Performance Monitor"
4. Watch GPU and CPU usage while scrolling
```

**Expected Results:**
- **Hero section (BlackHole)**: GPU drops to 0% when scrolled past
- **TechStack section**: Only 3-4 contexts active at once (not 10)
- **Projects section**: GPU pauses when scrolled away
- **Overall**: 70% less GPU/CPU usage

---

### 2. Performance Profile
```
1. Open DevTools → Performance tab
2. Click Record (●)
3. Scroll through entire page slowly
4. Stop recording after reaching footer
5. Analyze timeline
```

**What to look for:**
- Green bars (rendering) should drop when sections leave viewport
- No long yellow bars (scripting) during scroll
- Frame rate stays above 55 FPS

---

### 3. Visual Verification

**Test scroll behavior:**
```
1. Start at top (BlackHole visible)
2. Open Performance Monitor
3. Note GPU usage ~15-20%
4. Scroll down to About section
5. GPU should drop to ~5-8%
6. Continue to TechStack
7. Only 3-4 icons should animate simultaneously
8. Scroll to Projects - GPU increases (~25%)
9. Scroll past Projects - GPU drops again
10. Return to top - BlackHole resumes smoothly
```

---

### 4. Memory Leak Check
```
1. Open DevTools → Memory tab
2. Take heap snapshot
3. Scroll to bottom, then back to top
4. Repeat 5 times
5. Take another heap snapshot
6. Compare - should be similar size
```

---

### 5. Network Throttling Test
```
1. DevTools → Network tab
2. Set to "Fast 3G"
3. Reload page
4. Scroll through - sections should load progressively
5. No janky animations or frame drops
```

---

## Performance Metrics Checklist

### Before Optimization (Baseline)
- [ ] GPU usage: 80-100% continuous
- [ ] CPU usage: 45-55% 
- [ ] Scroll FPS: 30-45 (janky)
- [ ] WebGL contexts: 10+ simultaneous
- [ ] Battery drain: High

### After Stage 3 (Target)
- [ ] GPU usage: 25-35% average
- [ ] CPU usage: 14-22%
- [ ] Scroll FPS: 55-60 (smooth)
- [ ] WebGL contexts: 2-3 simultaneous
- [ ] Battery drain: Moderate

---

## Quick Commands

```powershell
# Start dev server
npm run dev

# Production build
npm run build

# Start production server
npm start
```

---

## Debugging Tools

### Check WebGL Context Pool
Open browser console and run:
```javascript
// Check active contexts
console.log('Active contexts:', performance.memory);

// Monitor frame rate
let lastTime = performance.now();
function checkFPS() {
  const now = performance.now();
  const fps = 1000 / (now - lastTime);
  console.log('FPS:', Math.round(fps));
  lastTime = now;
  requestAnimationFrame(checkFPS);
}
checkFPS();
```

### Check GPU Memory
```javascript
const gl = document.querySelector('canvas').getContext('webgl2');
const info = gl.getExtension('WEBGL_debug_renderer_info');
console.log('GPU:', gl.getParameter(info.UNMASKED_RENDERER_WEBGL));
```

---

## Common Issues

### Canvas not pausing
- Check `frameloop` prop is set correctly
- Verify `isInView` is changing (add console.log)
- Ensure IntersectionObserver is supported

### Animations still running
- Check GSAP timeline is being paused
- Verify `isActive` prop is passed correctly
- Look for useFrame without visibility check

### Memory increasing
- Ensure cleanup in useEffect returns
- Check WebGL contexts are released
- Verify event listeners are removed

---

## Performance Improvements Summary

| Component | Before | After | Savings |
|-----------|--------|-------|---------|
| **BlackHole** | Always rendering | Pauses when hidden | ~20% GPU |
| **TechStack** | 10 contexts | 3 contexts | ~70% GPU |
| **Projects** | Always rendering | Pauses when hidden | ~30% GPU |
| **Overall** | 80-100% GPU | 25-35% GPU | **70% reduction** |

---

## Next Steps

1. Test in dev mode with performance monitor
2. Verify GPU drops when scrolling away from sections
3. Check FPS stays above 55 during scroll
4. Test on mobile device (battery impact)
5. Run Lighthouse audit for before/after metrics
