import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class containing methods used to communicate with the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class FitnessJourney {
  // the token for interacting with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${FitnessJourney.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  /*************** Start User/Auth Routes *******************/

  /** Get a user. */

  static async getCurrentUser(username) {
    let res = await this.request(`athletes/${username}`);
    return res.user;
  }

  /** Get token for login from username, password. */

  static async login(data) {
    let res = await this.request(`auth/login`, data, "post");
    return res.token;
  }

  /** Signup for site. */

  static async register(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  /** Save user profile page. */

  static async saveProfile(username, data) {
    let res = await this.request(`athletes/${username}`, data, "patch");
    return res.user;
  }

  /** Delete user profile. */

  static async deleteProfile(username) {
    try {
      await axios.delete(`${BASE_URL}/athletes/${username}`);
    } catch (err) {
      console.log(err);
    }
  }

  /*************** End User/Auth Routes ***************************/

  /************ Start Post/Comment Routes *************************/

  /** Get all posts (filtered by date if not undefined) */

  static async getPosts(subject) {
    let res = await this.request("forum", { subject });
    return res.posts;
  }

  /** Get a single posts including its comments */

  static async getPost(postId) {
    let res = await this.request(`forum/${postId}`);
    return res.post;
  }

  static async addPost(data) {
    let res = await this.request("forum", data, "post");
    return res.post;
  }

  static async updatePost(postId, data) {
    try {
      let res = await this.request(`forum/${postId}`, data, "put");

      return res.post;
    } catch (err) {
      console.log(err);
    }
  }

  static async deletePost(postId) {
    try {
      await axios.delete(`${BASE_URL}/forum/${postId}`);
    } catch (err) {
      console.log(err);
    }
  }

  static async addComment(postId, data) {
    let res = await this.request(`forum/${postId}/comments/`, data, "post");
    return res.comment;
  }

  static async removeComment(postId, commentId) {
    try {
      await axios.delete(`${BASE_URL}/forum/${postId}/comments/${commentId}`);
    } catch (err) {
      console.log(err);
    }
  }

  /************ End Post/Comment Routes *************************/

  /*********** Start Exercise Routes ************************/

  /** Get exercises (filtered by name if not undefined) */

  static async getExercises(name) {
    let res = await this.request("exercises", { name });
    return res.exercises;
  }

  /** Get details on a exercise by id. */

  static async getExercise(id) {
    let res = await this.request(`exercises/${id}`);
    return res.exercise;
  }

  /************ End Exercise Routes******************************/

  /*********** Start Routines Routes ************************/

  static async getRoutines(name) {
    let res = await this.request("routines", { name });
    return res.routines;
  }

  static async getRoutine(routineId) {
    let res = await this.request(`routines/${routineId}`);
    return res.routine;
  }

  static async addRoutine(data) {
    let res = await this.request("routines", data, "post");
    return res.routine;
  }

  static async updateRoutine(routineId, data) {
    try {
      let res = await this.request(`routines/${routineId}`, data, "put");

      return res.routine;
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteRoutine(routineId) {
    try {
      await axios.delete(`${BASE_URL}/routines/${routineId}`);
    } catch (err) {
      console.log(err);
    }
  }

  static async getRoutineExercises(routineId) {
    let res = await this.request(`routines/${routineId}/exercises`);
    return res.routineExercises;
  }

  static async addExercise(data) {
    let res = await this.request(`routines/add-exercise`, data, "post");
    return res.exercise;
  }

  static async deleteExercise(id) {
    try {
      await axios.delete(`${BASE_URL}/routines/exercises/${id}`);
    } catch (err) {
      console.log(err);
    }
  }

  /*********** End Routines Routes ************************/

  /*********** Start Logs Routes ************************/

  static async getLogs(date) {
    let res = await this.request("logs", { date });
    return res.logs;
  }

  static async getLog(logId) {
    let res = await this.request(`logs/${logId}`);
    return res.log;
  }

  static async addLog(data) {
    let res = await this.request("logs", data, "post");
    return res.log;
  }

  static async updateLog(logId, data) {
    try {
      let res = await this.request(`logs/${logId}`, data, "put");

      return res.log;
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteLog(logId) {
    try {
      await axios.delete(`${BASE_URL}/logs/${logId}`);
    } catch (err) {
      console.log(err);
    }
  }

  static async getLogEntries(logId) {
    let res = await this.request(`logs/${logId}/entries`);
    return res.logEntries;
  }

  static async addLogEntry(data) {
    let res = await this.request(`logs/add-entry`, data, "post");
    return res.entry;
  }

  static async deleteLogEntry(id) {
    try {
      await axios.delete(`${BASE_URL}/logs/entries/${id}`);
    } catch (err) {
      console.log(err);
    }
  }

  static async getRoutinesWithExercises(logId) {
    let res = await this.request(`logs/${logId}/routines-exercises`);
    return res.routinesWithExercises;
  }

  /*********** End Logs Routes ************************/
}

export default FitnessJourney;
