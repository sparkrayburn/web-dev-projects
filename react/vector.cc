#include <iostream>
#include <vector>
using namespace std;


int main()
{
  system ("cls");
  vector<int> v;

  for (auto i = 0; i < 5; i++)
  {
    v.push_back(5);
  }
  
  for (auto i :v)
  {
    cout <<i << endl;

  }
  
  
  


return 0;
}