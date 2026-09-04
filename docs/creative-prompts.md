# Creative prompts for the homepage marquee

21 tiles, ids `c-01` to `c-21`. Generate at **1080 x 1350** (4:5, the Meta feed
portrait ratio the real ads run at), save as `c-01.jpg` and so on into
`public/creatives/`, then:

    npm i --no-save sharp && node scripts/to-webp.mjs

The marquee reads the directory at build time, so whatever is present shows and
the rest stay as mist slots. A partial set is fine.

## Shared style block

Append this to every prompt so the 21 read as one library rather than 21
unrelated stock images:

> Indian real estate advertising creative, Tamil Nadu / Karnataka context.
> Natural daylight photography, restrained colour, no lens flare, no HDR.
> Leave the upper third uncluttered for a headline overlay. No text, no
> lettering, no watermarks, no logos anywhere in the image. Photographic, not
> illustrated. 4:5 portrait.

"No text" matters: image models render Indian-language and even English ad copy
as garbage. Type goes on in the layout, not in the generation.

## The 21 angles

| id | angle | prompt subject |
|----|-------|----------------|
| c-01 | Price anchor | A mid-rise apartment facade at golden hour, clean symmetry, generous sky above |
| c-02 | Possession date | A finished apartment interior, empty and freshly handed over, morning light across a bare floor |
| c-03 | Walkthrough | A wide living room seen from the doorway, balcony doors open to greenery |
| c-04 | Floor plan | An architectural model of an apartment block on a table, shallow depth of field |
| c-05 | Locality drive | A tree-lined arterial road in a South Indian city, early morning, light traffic |
| c-06 | Approval proof | A site entrance with a boundary wall and gate, survey markers, plotted land beyond |
| c-07 | Founder piece | A builder in his fifties on a construction site, hard hat, mid-conversation, documentary style |
| c-08 | Resident voice | An Indian family of three on their apartment balcony, unposed, warm evening light |
| c-09 | Amenity cut | A residential clubhouse swimming pool at dusk, loungers, no people |
| c-10 | Investment case | An aerial of a developing city fringe, plots and new construction meeting farmland |
| c-11 | Site progress | An RCC frame under construction, tower crane, clear sky, four floors visible |
| c-12 | Launch offer | A show flat living room styled for a launch, fresh flowers, bright and uncluttered |
| c-13 | Comparison | Two contrasting streets meeting at a junction, older housing against new development |
| c-14 | Schools nearby | A school building with a playground in a residential neighbourhood, morning |
| c-15 | EMI framing | A couple in their thirties at a table with a laptop and papers, domestic interior, planning |
| c-16 | Vastu angle | An east-facing entrance doorway with morning sun falling directly across the threshold |
| c-17 | Handover proof | Keys being passed between two hands over a document, close crop, neutral background |
| c-18 | Drone reveal | A high aerial of a gated layout, internal roads and plot grid legible, green belt around |
| c-19 | Testimonial | An older Indian couple seated in their own living room, relaxed, natural window light |
| c-20 | Scarcity | A plotted layout with most plots developed and a few vacant, aerial, late afternoon |
| c-21 | Clubhouse | A residential clubhouse lounge interior, double-height ceiling, daylight, unoccupied |

## Before these go live

The section currently says **"72 distinct creative angles shipped in the last
90 days"** and each tile carries a CPL (`c-01` reads `Rs 890 CPL`). Those numbers
are invented, and the component's own comment calls these "real ad creatives".

Generated images are illustrative, not shipped work. If these are AI concepts
rather than real ads, the CPL labels come off and the caption changes to
describe angles tested rather than results achieved. Otherwise the page makes a
performance claim that the picture beside it cannot support, which is the same
problem the proof grid was gated for.

Real creatives from the Meta account carry real CPLs and need no such caveat.
That route stays open and is strictly better.
