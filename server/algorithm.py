class User:
    def __init__(self, name):
        self.name = name
        self.cash_amount = 0  # relates to if the user needs to pay (positive) or receive (negative) and 0 is balanced

    def __str__(self):
        return f"{self.name}: {self.cash_amount}"


class Expense:
    def __init__(self, title: str, price: float, paid_by: str, participants: [str], id: int):
        # name of the expense, price, name of the person who paid for it, list of names to divide with, id
        self.title = title
        self.price = price
        self.paid_by = paid_by
        self.participants = participants
        self.id = id

    def __str__(self):
        # return f"Details:\n\tID: {self.id}\n\tExpense: {self.name}\n\tPrice: {self.price}\n\tPaid by: {
        # self.person_name}\n\tDivided with {', '.join(self.list_to_divide)}"
        return f"{self.id}\t{self.title}\t{self.price}\t{self.paid_by}\t{', '.join(self.participants)}"


class App:
    def __init__(self):
        self.users = []  # everyone in the group
        self.expenses = {}  # all expenses in the group
        self.total = 0  # total cash for all expenses
        self.id = 1

    def add_user(self, name: str) -> None:
        # add person to the group
        self.users.append(User(name))

    def add_expense(self, title: str, price: float, paid_by: str, participants: [str]) -> None:
        self.expenses[self.id] = Expense(title, price, paid_by, participants, self.id)
        self.id += 1
        self.total += price

        for user in self.users:
            if user.name.lower() == paid_by.lower():
                user.cash_amount -= price

            if user.name.lower() in participants:
                user.cash_amount += price / len(participants)

    def remove_expense(self, id: int) -> None:
        expense = self.expenses.get(id)
        if expense is None:
            print(f"No expense with the id {id}")
            return

        self.total -= expense.price
        for user in self.users:
            if user.name.lower() == expense.paid_by.lower():
                user.cash_amount += expense.price

            if user.name.lower() in expense.participants:
                user.cash_amount -= expense.price / len(expense.participants)

        del self.expenses[id]

    def update_expense(self, id: int, title: str = None, price: float = None, paid_by: str = None, participants: [str] = None) -> None:
        expense = self.expenses.get(id)
        if expense is None:
            print(f"No product with the id {id}")
            return

        if title is not None:
            expense.title = title
        if price is not None:
            expense.price = price
        if paid_by is not None:
            expense.paid_by = paid_by
        if participants is not None:
            expense.participants = participants

        self.remove_expense(id)
        self.add_expense(expense.title, expense.price, expense.paid_by, expense.participants)

    def show_balances(self):
        # List users by their cash amounts in descending order
        sorted_users = sorted(self.users, key=lambda x: x.cash_amount, reverse=True)

        i = 0
        j = len(sorted_users) - 1
        while i < j:
            if abs(sorted_users[i].cash_amount) < 0.001:  # Almost zero, consider it as zero
                i += 1
                continue
            if abs(sorted_users[j].cash_amount) < 0.001:  # Almost zero, consider it as zero
                j -= 1
                continue

            # Person i will receive money, person j will pay money
            amount = min(abs(sorted_users[i].cash_amount), abs(sorted_users[j].cash_amount))
            if sorted_users[j].cash_amount + amount < 0.001:  # Person j still owes money after this transaction
                print(f"{sorted_users[j].name} owes {amount} to {sorted_users[i].name}")
                sorted_users[i].cash_amount -= amount
                sorted_users[j].cash_amount += amount
            else:  # Person i's owed amount is settled after this transaction
                print(f"{sorted_users[j].name} owes {amount} to {sorted_users[i].name}")
                sorted_users[i].cash_amount -= amount
                sorted_users[j].cash_amount += amount
                i += 1

    def get_total(self) -> float:
        return self.total

    def get_expense(self, e_id: int):
        expense = self.expenses.get(e_id)
        if expense is None:
            print(f"No product with the id {e_id}")
            return None
        return expense

    def get_expenses_table(self) -> None:
        # Header
        print(f'{"id":<10}{"name":<10}{"price":<10}{"paid by":<15}{"participants"}')

        # Data
        for expense in self.expenses.values():
            id, name, price, paid_by, participants = str(expense).split('\t')
            print(f'{id:<10}{name:<10}{price:<10}{paid_by:<15}{participants}')
        print("------------------------------------------------------")
        print(f'{len(self.expenses):<10}{"":<10}{self.get_total():<10}{"":<15}{""}')

    def start(self):
        while True:
            print("""
            Options:
            1. Add User
            2. Add Expense
            3. Remove Expense
            4. Update Expense
            5. Show Expenses
            6. Show Balance
            
            """)

            choice = input("What would you like to do? ")
            if choice == "1":
                name = input("Enter the user name: ")
                self.add_user(name)
            elif choice == "2":
                title = input("Enter the expense title: ")
                price = input("Enter the price: ")
                paid_by = input("Enter who paid for it: ")
                participants = input("Enter the participants separated by spaces: ")
                self.add_expense(title, int(price), paid_by, participants.split(" "))
            elif choice == "3":
                print("This are the ids with their expenses")
                for key, value in self.expenses.items():
                    print(f"\t{key}. {value.title}")
                eid = int(input("Enter the id of the expanse to remove: "))
                self.remove_expense(eid)
            elif choice == "4":
                print("This are the ids with their expenses")
                for key, value in self.expenses.items():
                    print(f"\t{key}. {value.name}")
                eid = int(input("Enter the id of the expanse to update: "))
                print("Enter the fields you want to update, leave it empty if not updating.")
                title = input("Enter the expense title: ")
                price = input("Enter the price: ")
                paid_by = input("Enter who paid for it: ")
                participants = input("Enter the participants separated by spaces: ")
                self.update_expense(eid, title if title != "" else None, int(price) if price != "" else None, paid_by if paid_by != "" else None, participants.split(" ") if participants != "" else None)
            elif choice == "5":
                self.get_expenses_table()
            elif choice == "6":
                self.show_balances()

app = App()
app.add_user("Gabe")
app.add_user("Fred")
app.add_user("Bob")
app.add_user("Charlie")
app.add_user("Ema")
app.add_user("David")
app.add_user("Alice")
app.add_expense("a", 60, "bob", ["bob", "gabe"])
app.add_expense("b", 20, "bob", ["bob", "fred"])
app.add_expense("c", 30, "david", ["david", "gabe", "fred"])
app.add_expense("d", 60, "charlie", ["charlie", "fred"])
app.add_expense("e", 20, "ema", ["ema", "fred"])
app.add_expense("f", 80, "charlie", ["charlie", "bob"])
app.add_expense("g", 20, "david", ["david", "charlie"])
app.add_expense("h", 100, "ema", ["ema", "david"])
app.add_expense("j", 50, "alice", ["alice", "charlie"])
app.start()





