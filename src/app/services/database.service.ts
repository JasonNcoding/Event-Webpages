import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }

  listCategories() {
    return this.http.get("/api/v1/category/32508085/list");
  }

  addCategory(category: any) {
    return this.http.post("/api/v1/category/32508085/add", category, httpOptions);
  }

  updateCategory(category: any) {
    return this.http.put("api/v1/category/32508085/update", category, httpOptions);
  }

  deleteCategory(categoryId: string) {
    let body = { categoryId: categoryId };
    return this.http.delete("/api/v1/category/32508085/delete", { body: body });
  }

  getCategory(categoryId: string) {
    return this.http.get(`/api/v1/category/32508085/${categoryId}/retrieve`);
  }

  getEventCount() {
    return this.http.get('/api/v1/stats/count-events');
  }

  getCategoryCount() {
    return this.http.get('/api/v1/stats/count-categories');
  }
 
  addEvent(event:any) {
    return this.http.post("/hoang/api/v1/event/add-event", event, httpOptions)
  }

  listEvent() {
    return this.http.get("/hoang/api/v1/event/events");
  }

  updateEvent(obj: any) {
    return this.http.put("/hoang/api/v1/event/update-event", obj);
  }

  deleteEvent(eventId: string) {
    let body = { eventId: eventId };
    return this.http.delete("/hoang/api/v1/event/delete-event", {body:body});
  }

  viewEvent(eventId: string) {
    return this.http.get(`/hoang/api/v1/event/view-event/${eventId}`);
  }

  getOperationCount() {
    return this.http.get('/api/v1/stats/count-operations');
  }

}
