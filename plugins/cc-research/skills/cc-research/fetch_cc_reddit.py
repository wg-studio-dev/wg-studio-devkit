#!/usr/bin/env python3
"""
Fetch and filter posts from r/ClaudeCode RSS feed.
Outputs JSON with relevant posts for analysis.
"""

import feedparser
import json
from datetime import datetime, timedelta
import sys
import urllib.request

def fetch_reddit_posts(subreddit="ClaudeCode", days_back=1):
    """
    Fetch posts from a subreddit's RSS feed.

    Args:
        subreddit: Name of the subreddit
        days_back: How many days back to fetch posts

    Returns:
        List of filtered post dictionaries
    """
    rss_url = f"https://www.reddit.com/r/{subreddit}/new/.rss"

    try:
        # Use custom headers to avoid being blocked
        req = urllib.request.Request(
            rss_url,
            headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
        )
        feed = feedparser.parse(urllib.request.urlopen(req))

        if feed.bozo:
            print(f"Error parsing RSS feed: {feed.bozo_exception}", file=sys.stderr)
            return []

        cutoff_time = datetime.now() - timedelta(days=days_back)
        filtered_posts = []

        for entry in feed.entries:
            # Parse the published date
            pub_date = datetime(*entry.published_parsed[:6])

            # Only include recent posts
            if pub_date < cutoff_time:
                continue

            # Filter out common support/help posts (optional - can adjust)
            title_lower = entry.title.lower()

            # Skip very basic help requests
            skip_keywords = ['help', 'issue', 'problem', 'not working', 'error', 'broken']
            if any(keyword in title_lower for keyword in skip_keywords) and len(entry.title) < 50:
                continue

            post = {
                'title': entry.title,
                'link': entry.link,
                'published': pub_date.isoformat(),
                'author': entry.author if hasattr(entry, 'author') else 'Unknown',
                'summary': entry.summary if hasattr(entry, 'summary') else '',
            }

            filtered_posts.append(post)

        return filtered_posts

    except Exception as e:
        print(f"Error fetching Reddit posts: {e}", file=sys.stderr)
        return []

def main():
    posts = fetch_reddit_posts(days_back=30)  # Get last 30 days

    print(json.dumps({
        'fetch_time': datetime.now().isoformat(),
        'post_count': len(posts),
        'posts': posts
    }, indent=2))

    if len(posts) == 0:
        print("No new posts found in the last 30 days.", file=sys.stderr)
        sys.exit(0)

if __name__ == "__main__":
    main()
