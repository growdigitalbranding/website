# Creative prompts for the homepage marquee

21 tiles, ids `c-01` to `c-21`, matching the angles in
`src/components/sections/CreativeMarqueeSection.tsx`.

Each prompt below is **self-contained**. Paste one, generate, move to the next.
Nothing needs appending.

## Output settings

- **Aspect ratio 3:4 or 4:5 portrait.** Either works. The marquee has two rows
  and they are different shapes: row one is 260x325 (4:5), row two is 300x300
  (square). Every tile uses `object-cover`, so the source ratio only decides how
  much is cropped, never whether it fits.

  A 3:4 source loses about 6% of its height in the 4:5 row and 25% in the square
  row. A 4:5 source loses nothing in the first and 20% in the second. The
  difference between the two is small, and 3:4 is the more widely supported
  option, so use it if that is what your generator offers.

  **Because a partial set cycles through both rows, any image can land in the
  square one.** Frame accordingly: keep the subject roughly centred vertically
  with margin above and below, and never put anything that matters in the top or
  bottom eighth of the frame.
- **Minimum 1080px wide.** Anything smaller looks soft on a retina screen.
- Save as `c-01.jpg` … `c-21.jpg` into `public/creatives/`, then:

      npm i --no-save sharp && node scripts/to-webp.mjs

  That resizes to the display width and converts to WebP. The 18.9MB of proof
  PNGs became 1.1MB this way.

The marquee reads the directory at build time. Generate three or generate all
21 — whatever is present shows, and the section cycles a partial set across
both rows so it reads as finished rather than patchy.

**Check the output is unwatermarked** before adding it. Free tiers on most
generators stamp their output.

## Why every prompt says "no text"

Image models render Indian-language and English ad copy as convincing-looking
gibberish. Type goes on in the layout, never in the generation. Every prompt
ends with that constraint. Keep it.

---

## c-01 · Price anchor

> A mid-rise residential apartment building photographed from street level at
> golden hour in Coimbatore, Tamil Nadu. Clean modern facade, horizontal
> balcony lines, warm low sun raking across the concrete and glass. A few
> mature rain trees at the base for scale. Generous uncluttered sky filling the
> upper third of the frame. Natural daylight photography, restrained colour, no
> HDR, no lens flare, no heavy saturation. Full-frame camera, 35mm lens, sharp
> fine detail, documentary architectural photography. Absolutely no text, no
> lettering, no signage, no watermarks, no logos anywhere in the image.
> Photographic, not illustrated. Vertical portrait composition.

## c-02 · Possession date

> The interior of a newly completed and empty Indian apartment, photographed on
> the morning of handover. Bare vitrified tile floor catching soft window
> light, plain white walls, a single open window with no curtains, no
> furniture, no people. Quiet and clean rather than staged. Natural daylight
> only, restrained neutral colour, gentle shadows, no HDR. Full-frame camera,
> 28mm lens, sharp detail, architectural interior photography. Upper third of
> the frame kept calm and uncluttered. Absolutely no text, no lettering, no
> signage, no watermarks, no logos anywhere in the image. Photographic, not
> illustrated. Vertical portrait composition.

## c-03 · Walkthrough

> A wide view of an Indian apartment living room seen from the doorway, sliding
> balcony doors open onto green foliage outside. Sparse contemporary furniture,
> neutral upholstery, daylight flooding in from the balcony and falling across
> the floor. Lived-in but uncluttered. Natural light only, restrained warm
> neutral palette, no HDR, no colour cast. Full-frame camera, 24mm lens, deep
> focus, interior architectural photography. Absolutely no text, no lettering,
> no signage, no watermarks, no logos anywhere in the image. Photographic, not
> illustrated. Vertical portrait composition.

## c-04 · Floor plan

> A physical architectural scale model of a residential apartment block on a
> matte white table in a design studio. Fine card and acrylic construction,
> visible storeys and balconies, tiny model trees at the base. Lit from one
> side by soft north window light, shallow depth of field with the near edge
> falling out of focus. Restrained neutral palette, no HDR, no plastic sheen.
> Macro photography, 100mm lens, extremely sharp on the plane of focus.
> Absolutely no text, no lettering, no labels, no watermarks, no logos anywhere
> in the image. Photographic, not illustrated. Vertical portrait composition.

## c-05 · Locality drive

> A tree-lined arterial road in a South Indian city photographed early in the
> morning, light traffic, long shadows across the tarmac. Mature rain trees
> arching from both sides, a divider with low planting, low-rise buildings set
> back behind. Soft hazy morning light, restrained natural colour, no HDR, no
> lens flare. Full-frame camera, 50mm lens, sharp detail, documentary street
> photography. Upper third kept open for a headline overlay. Absolutely no
> text, no lettering, no signage, no hoardings, no watermarks, no logos
> anywhere in the image. Photographic, not illustrated. Vertical portrait
> composition.

## c-06 · Approval proof

> The entrance to a plotted land development in Tamil Nadu: a plain rendered
> boundary wall, an open metal gate, a compacted approach road, survey markers
> and corner stones visible on the plots beyond. Coconut palms along the
> boundary, farmland in the far distance. Clear morning light, restrained
> natural colour, dust and dryness visible, no HDR, no beautification.
> Full-frame camera, 35mm lens, sharp detail, documentary photography.
> Absolutely no text, no lettering, no signage, no boards, no watermarks, no
> logos anywhere in the image. Photographic, not illustrated. Vertical portrait
> composition.

## c-07 · Founder piece

> An Indian builder in his fifties standing on an active construction site,
> wearing a white hard hat and a plain shirt, mid-conversation and looking off
> camera, unposed. Scaffolding and an RCC frame soft behind him. Overcast
> diffused daylight, restrained natural colour, no HDR, no studio lighting.
> Full-frame camera, 85mm lens, shallow depth of field, environmental portrait
> in a documentary style. Absolutely no text, no lettering, no signage, no
> watermarks, no logos anywhere in the image or on the clothing. Photographic,
> not illustrated. Vertical portrait composition.

## c-08 · Resident voice

> An Indian family of three standing on the balcony of their apartment in the
> early evening, relaxed and unposed, looking out rather than at the camera.
> Warm low sun on their faces, the city softly out of focus behind them.
> Natural light only, restrained warm colour, no HDR, no flash. Full-frame
> camera, 85mm lens, shallow depth of field, candid documentary portrait.
> Absolutely no text, no lettering, no signage, no watermarks, no logos
> anywhere in the image or on the clothing. Photographic, not illustrated.
> Vertical portrait composition.

## c-09 · Amenity cut

> A residential clubhouse swimming pool at dusk, empty and still, underwater
> lights just coming on, loungers arranged along one edge, planting and a low
> clubhouse building behind. Deep blue evening sky with the last warm light on
> the horizon. No people. Restrained colour, natural and architectural lighting
> only, no HDR, no neon. Full-frame camera, 24mm lens, long exposure, sharp
> detail, architectural photography. Absolutely no text, no lettering, no
> signage, no watermarks, no logos anywhere in the image. Photographic, not
> illustrated. Vertical portrait composition.

## c-10 · Investment case

> A high aerial photograph of a developing city fringe in South India, where a
> grid of new plots and half-built houses meets open farmland. Visible
> transition from dense settlement to green fields, a arterial road cutting
> diagonally through. Clear late morning light, restrained natural colour, no
> HDR. Drone photography, sharp fine detail across the frame, documentary
> aerial. Absolutely no text, no lettering, no signage, no watermarks, no logos
> anywhere in the image. Photographic, not illustrated. Vertical portrait
> composition.

## c-11 · Site progress

> A reinforced concrete building frame under construction, four storeys of
> columns and slabs complete, a tower crane rising alongside, scaffolding and
> shuttering visible, a few workers small in the frame for scale. Clear bright
> sky above filling the upper third. Harsh midday South Indian sun, restrained
> natural colour, dust in the air, no HDR, no beautification. Full-frame
> camera, 35mm lens, sharp detail, documentary construction photography.
> Absolutely no text, no lettering, no signage, no watermarks, no logos
> anywhere in the image. Photographic, not illustrated. Vertical portrait
> composition.

## c-12 · Launch offer

> A show flat living room styled for a project launch: contemporary Indian
> interior, neutral sofa, a low coffee table with fresh flowers, sheer curtains
> diffusing bright daylight, everything immaculate and uncluttered. No people.
> Natural light only, restrained warm neutral palette, no HDR, no colour cast.
> Full-frame camera, 24mm lens, deep focus, interior photography for a
> property brochure. Absolutely no text, no lettering, no signage, no
> watermarks, no logos anywhere in the image. Photographic, not illustrated.
> Vertical portrait composition.

## c-13 · Comparison

> A junction in an Indian city where two eras of housing meet: older low-rise
> buildings with weathered paint on one side, new construction with clean
> render and glass on the other, the boundary between them clearly legible.
> Overcast even daylight so neither side is flattered, restrained natural
> colour, no HDR. Full-frame camera, 35mm lens, sharp detail, documentary urban
> photography. Absolutely no text, no lettering, no signage, no hoardings, no
> watermarks, no logos anywhere in the image. Photographic, not illustrated.
> Vertical portrait composition.

## c-14 · Schools nearby

> A school building with an open playground in a residential neighbourhood in
> Tamil Nadu, photographed in the morning. Simple painted architecture, a
> boundary wall, trees along the edge of the ground, a few children small and
> unidentifiable in the distance. Soft morning light, restrained natural
> colour, no HDR. Full-frame camera, 50mm lens, sharp detail, documentary
> photography. Absolutely no text, no lettering, no signage, no name boards, no
> watermarks, no logos anywhere in the image. Photographic, not illustrated.
> Vertical portrait composition.

## c-15 · EMI framing

> An Indian couple in their early thirties sitting at a dining table at home
> with a laptop and a few printed papers, in the middle of working something
> out together, unposed and undramatic. Soft daylight from a window to one
> side, ordinary domestic interior behind them. Natural light only, restrained
> warm colour, no HDR, no flash. Full-frame camera, 50mm lens, shallow depth of
> field, candid documentary photography. Absolutely no text, no lettering, no
> readable documents, no watermarks, no logos anywhere in the image.
> Photographic, not illustrated. Vertical portrait composition.

## c-16 · Vastu angle

> An east-facing entrance doorway of a South Indian home at sunrise, with the
> low morning sun falling directly across the threshold and casting a long
> bright rectangle onto the floor inside. Simple wooden door, plain rendered
> wall, a small step, no clutter. Warm directional dawn light, restrained
> colour, deep quiet shadows, no HDR. Full-frame camera, 35mm lens, sharp
> detail, architectural photography. Absolutely no text, no lettering, no
> signage, no watermarks, no logos anywhere in the image. Photographic, not
> illustrated. Vertical portrait composition.

## c-17 · Handover proof

> A close crop of a set of house keys being passed from one pair of Indian
> hands to another over a document on a table. Only hands and forearms in
> frame, no faces. Soft diffused daylight, shallow depth of field with the keys
> sharp, restrained neutral colour, no HDR, no studio lighting. Full-frame
> camera, 85mm macro, extremely sharp on the keys. Absolutely no text, no
> lettering, no readable document, no watermarks, no logos anywhere in the
> image. Photographic, not illustrated. Vertical portrait composition.

## c-18 · Drone reveal

> A high aerial drone photograph of a gated residential plotted development on
> the outskirts of Coimbatore, Tamil Nadu. A clear grid of internal asphalt
> roads, individual plots marked by low boundary walls, a handful of completed
> independent houses, mature coconut palms and rain trees along the perimeter,
> green belt and farmland beyond the boundary. Late afternoon sun, long soft
> shadows, restrained natural colour, no HDR, no lens flare. Drone photography,
> sharp fine detail across the frame. Absolutely no text, no lettering, no
> signage, no watermarks, no logos anywhere in the image. Photographic, not
> illustrated. Vertical portrait composition.

## c-19 · Testimonial

> An older Indian couple in their sixties seated together in their own living
> room, relaxed and at ease, one of them mid-sentence. Ordinary furnished
> domestic interior, soft daylight from a window to the left. Natural light
> only, restrained warm colour, no HDR, no flash, nothing staged. Full-frame
> camera, 85mm lens, shallow depth of field, candid documentary portrait.
> Absolutely no text, no lettering, no signage, no watermarks, no logos
> anywhere in the image. Photographic, not illustrated. Vertical portrait
> composition.

## c-20 · Scarcity

> An aerial photograph of a plotted residential layout in late afternoon where
> most plots carry completed houses and only a handful remain vacant, the empty
> ones clearly readable as gaps in the pattern. Internal roads forming a grid,
> long shadows from the low sun, green boundary planting. Restrained natural
> colour, no HDR. Drone photography, sharp fine detail. Absolutely no text, no
> lettering, no signage, no watermarks, no logos anywhere in the image.
> Photographic, not illustrated. Vertical portrait composition.

## c-21 · Clubhouse

> The interior lounge of a residential clubhouse, double-height ceiling, tall
> windows letting in bright diffused daylight, contemporary seating arranged in
> groups, a stone floor, planting in large pots. Unoccupied and calm.
> Restrained neutral palette with warm timber accents, natural light only, no
> HDR, no artificial colour. Full-frame camera, 24mm lens, deep focus,
> architectural interior photography. Absolutely no text, no lettering, no
> signage, no watermarks, no logos anywhere in the image. Photographic, not
> illustrated. Vertical portrait composition.

---

## One change these require

The section caption reads **"72 distinct creative angles shipped in the last
90 days"** and every tile carries a CPL (`c-01` reads `Rs 890 CPL`). Those
numbers are invented, and the component's own comment describes these as real
ad creatives.

Generated images are illustrative, not shipped work. If these go in as AI
concepts, the CPL labels come off and the caption changes to describe angles
tested rather than results achieved, otherwise the page makes a performance
claim the picture beside it cannot support.

Real creatives pulled from the Meta account carry real CPLs and need none of
this. That route is still open and is strictly better.
