# Project Prompts Log


## 2026-01-11

### 10:25:29

```
I want to add the ralph-heavy plugin from my personal .claude folder to the devkit. i want ralph-heavy to both be its own unique plugin, with the description "ralph, with learning loops". Also include it in the all-plugins plugin as well.
```

### 10:26:24

```
adjust /pace to reflect that my usage resets on thursdays at 11am pacific 
```

### 10:33:40

```
can we update /pace so that it... 

1. calculates % through the week until reset
2. runs /usage and pulls my weekly usage
3. shows the difference between the week's progress versus my actual usage? 
```

### 10:40:18

```
yes update it to prompt for usage %
```

### 10:40:44

```
yes push it
```

### 16:24:00

```
i want you to go to this repo and install the flow-next plugin:

https://github.com/gmickel/gmickel-claude-marketplace/tree/main
```

### 16:35:18

```
/flow-next:setup 
```

### 16:47:54

```
ok, now I want to modify my own ralph-heavy plugin to incorporate what's in flow-next, but with this addition: Here’s a text from my friend about how he uses lessons.md with respect to ralph-heavy:

One thing I just learned with lessons.md as well is that if you also have Markdown files that your.Claude folder refers to, you need to make explicit references to what goes in your rules folder versus what goes in your Learnings folder. I had instances where it was putting things in the learnings folder that should have actually gone in the rules folder. 

Basically, I have some very specific methodology files that I have to use for gathering data, so I wanted learnings for those to go to that specific Markdown file, vs. my Claude learnings file is more of a broader hierarchy or categorization of things I wish I would have known 

here’s something from his claude.md file:
 ## When to Add Here vs. Rule Files

| Add to LEARNINGS.md | Add to `.claude/rules/*.md` |
|---------------------|----------------------------|
| Unexpected errors and their fixes | Documented API behaviors |
| Corrections from user feedback | Established code patterns |
| "I wish I knew this earlier" moments | Data source specifications |
| Tool quirks and workarounds | Command references |
| Session-specific discoveries | Reusable architecture rules |

**Rule of thumb**: If it's a **discovery** (something that surprised you), add it here. If it's **established knowledge** (how something is designed to work), add it to the appropriate rule file.

### Rule Files Reference

| File | Contents |
|------|----------|
| `.claude/rules/sec-edgar.md` | SEC XBRL tags, company CIKs, Amazon TTM trap, Alphabet dual-CIK, Meta finance leases, Amazon tag transition |
| `.claude/rules/interconnection-queues.md` | ISO data sources, generation type mapping, status normalization, refresh commands |
| `.claude/rules/data-refresh.md` | All data refresh commands, production vs local, update schedules |
| `.claude/rules/admin-portal.md` | Route structure, health score algorithm, analytics integration |
```

### 19:28:24

```
usage
```

### 19:28:26

```
usage
```


## 2026-01-14

### 22:32:24

```
i want you to copy the building-skills skill from my personal .claude to this devkit. make it as its own plugin, and also include it in the all-plugins plugin
```

### 22:40:51

```
push it
```

### 22:43:06

```
in the description for building-skills, can we incldue a citation like "based on work by <author of that repo>"?
```


## 2026-02-06

### 14:42:21

```
ok i want to pair down the contents of this devkit so it only contains...

cc-research

frontend-imitate

gemini

nano-banana

ralph-heavy

and I want to add in my plan-heavy command 
```

### 14:59:26

```
commit this to main 
```

