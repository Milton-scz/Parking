import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { getAllUsers } from 'src/app/graphql/users/graphql.queries';
import { deleteUser } from 'src/app/graphql/users/graphql.mutation';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  users: User[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;
  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.loadData();
  }
  loadData(): void {
    this.apollo
      .watchQuery({
        query: getAllUsers,
      })
      .valueChanges.subscribe((result: any) => {
        this.users = result?.data?.getAllUsers;
        console.log(this.users);
      });
    }
  deleteUser(id: number): void {
    this.apollo.mutate({
      mutation: deleteUser,
      variables: {
        id:id,
      }
    }).subscribe({
      next: (response: any) => {
        if (response.data.deleteUser==true) {
          console.log(response);
          this.successMessage = 'Cliente eliminado con éxito!';
          this.errorMessage = null;
          this.users = this.users.filter(user => user.id !==id);
        } else {
          console.log(response);
          this.errorMessage = 'Error al eliminar el usuario. Por favor, intente nuevamente.';
          this.successMessage = null;
        }
      },
      error: (error) => {
        this.errorMessage = 'Error al eliminar el usuario. Por favor, intente nuevamente.';
        this.successMessage = null;
        console.error('Error:', error);
      }
    });
  }
}


