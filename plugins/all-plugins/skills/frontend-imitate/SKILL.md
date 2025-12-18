# frontend-imitate

Create frontend designs by imitating reference websites. This skill uses lazy-context by fetching design patterns from URLs on-demand rather than describing them in this file.

## How It Works

1. Fetch and analyze reference sites using WebFetch
2. Extract design patterns: layout structure, spacing, colors, typography, component styles
3. Apply extracted patterns to the user's requested component/page
4. Maintain the distinctive aesthetic of the reference sites
5. Avoid generic AI design patterns

## Reference Sites

Edit this list to change your design inspiration sources:

- https://news.ycombinator.com - Minimalist brutalist layout, dense information hierarchy
- https://motherfuckingwebsite.com - Extreme minimalism, typography-first
- https://berkshirehathaway.com - Authentic brutalist aesthetic, zero styling
- https://craigslist.org - Functional density, no decoration
- https://brutalistwebsites.com - Curated examples (fetch specific examples from here)

## Instructions for the Agent

When the user requests frontend work:

1. **Analyze references first**: Use WebFetch on 2-3 most relevant reference sites
2. **Extract specific patterns**:
   - Color schemes (exact hex codes if possible)
   - Typography (font choices, sizes, line heights)
   - Spacing systems (margins, padding patterns)
   - Layout approaches (grid, flex, positioning)
   - Component treatments (buttons, forms, cards)
   - Border and decoration styles (or lack thereof)

3. **Apply patterns authentically**: Don't just describe the reference sites - actually use their design DNA in your implementation

4. **Stay distinctive**: The goal is to create something that feels like it belongs with these references, not like generic AI-generated UI

## Customization

Users should edit the Reference Sites section above to match their preferred aesthetic. The same skill works for any design style by changing the URLs.

## Example Usage

User: "Create a landing page for my API documentation"

Agent should:
- Fetch 2-3 reference sites
- Note: "I see heavy use of monospace fonts, minimal color (mostly black/white), dense text layout..."
- Build landing page using those extracted patterns
- Result feels authentic to the reference aesthetic