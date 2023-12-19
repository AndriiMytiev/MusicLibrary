import { makeAutoObservable } from "mobx";
import RootStore from "..";
import axios, { AxiosError } from "axios";
import { Music, MusicCreate } from "../../types/music";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "../../firebase";

export default class MusicStore {
  rootStore: RootStore;

  music: Music[] = [];

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  setMusic = (music: Music[]) => {
    this.music = music;
  };

  getMusic = async () => {
    try {
      const response = await axios.get(
        `${this.rootStore.globalStore.serverUrl}/api/music`,
      );
      this.setMusic(response.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error fetching music:", axiosError.message);
    }
  };

  getMusicByID = async (musicId: number): Promise<Music | null> => {
    try {
      const response = await axios.get(
        `${this.rootStore.globalStore.serverUrl}/api/music/${musicId}`,
      );
      return response.data as Music; // Повертаємо конкретного користувача
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error fetching user:", axiosError.message);
      return null; // Повертаємо null у разі помилки
    }
  };

  processMusicCreating = async (musicData: MusicCreate) => {
    try {
      const response = await axios.post(
        `${this.rootStore.globalStore.serverUrl}/api/music`,
        musicData,
      );

      if (!response.data) {
        throw new Error("Failed to add new music");
      }

      console.log("Added new music:", response.data);
      this.getMusic();
      return true;
    } catch (error) {
      console.error("Error adding new music:", error);
      return false;
    }
  };

  processMusicEditing = async (music: Music) => {
    try {
      // Ваш запит PUT для оновлення користувача
      const response = await axios.put(
        `${this.rootStore.globalStore.serverUrl}/api/music`,
        music,
      );

      // Опціонально, обробляйте відповідь від сервера
      console.log("Updated music:", response.data);
      this.getMusic();
      return true;
    } catch (error) {
      // Обробка помилок
      console.error("Error updating music:", error);
      return false;
    }
  };

  processMusicDeleting = async (music: Music) => {
    const musicRef = ref(storage, `music/${music.fileName}`);
    try {
      const response = await axios.delete(
        `${this.rootStore.globalStore.serverUrl}/api/music/${music.id}`,
      );
      console.log("Delete music:", response.data);
      deleteObject(musicRef)
        .then(() => {
          console.log("Delete music from FirebaseStorage: ", music.fileName);
        })
        .catch((error) => {
          console.error(error);
        });
      this.getMusic();
    } catch (error) {
      console.error("Error deleting music:", error);
    }
  };
}
export const testMusicList: Music[] = [
  {
    id: 1,
    user: 1,
    title: "Test audio",
    fileName: "testAudio.mp3",
    author: "User User",
    tags: ["pop1", "hip-hop1"],
  },
  {
    id: 2,
    user: 1,
    title: "Test audio1",
    fileName: "testAudio1.mp3",
    author: "User User",
    tags: ["pop2", "hip-hop2"],
  },
  {
    id: 3,
    user: 14,
    title: "Test audio2",
    fileName: "testAudio2.mp3",
    author: "User User",
    tags: ["pop3", "hip-hop3"],
  },
  {
    id: 4,
    user: 16,
    title: "Test audio3",
    fileName: "testAudio3.mp3",
    author: "User User",
    tags: ["pop4", "hip-hop4"],
  },
  {
    id: 5,
    user: 18,
    title: "Thunder",
    fileName: "Imagine Dragons - Thunder.mp3",
    author: "Imagine Dragons",
    tags: ["pop5", "hip-hop5"],
  },
  {
    id: 6,
    user: 1,
    title: "Test audio",
    fileName: "testAudio.mp3",
    author: "User User",
    tags: ["pop1", "hip-hop1"],
  },
  {
    id: 7,
    user: 1,
    title: "Test audio1",
    fileName: "testAudio1.mp3",
    author: "User User",
    tags: ["pop2", "hip-hop2"],
  },
  {
    id: 8,
    user: 14,
    title: "Test audio2",
    fileName: "testAudio2.mp3",
    author: "User User",
    tags: ["pop3", "hip-hop3"],
  },
  {
    id: 9,
    user: 16,
    title: "Test audio3",
    fileName: "testAudio3.mp3",
    author: "User User",
    tags: ["pop4", "hip-hop4"],
  },
  {
    id: 10,
    user: 18,
    title: "Thunder",
    fileName: "Imagine Dragons - Thunder.mp3",
    author: "Imagine Dragons",
    tags: ["pop5", "hip-hop5"],
  },
];
