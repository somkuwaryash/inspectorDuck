import { YoutubeTranscript as YTTranscript, TranscriptResponse } from 'youtube-transcript';

export class YoutubeTranscript {
  public static async fetchTranscript(videoId: string): Promise<TranscriptResponse[]> {
    try {
      return await YTTranscript.fetchTranscript(videoId);
    } catch (error) {
      console.error('Error fetching YouTube transcript:', error);
      throw new Error('Failed to fetch YouTube transcript');
    }
  }

  public static retrieveVideoId(url: string): string {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/);
    if (!match) {
      throw new Error('Invalid YouTube URL');
    }
    return match[1];
  }
}