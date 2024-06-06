export const LANGUAGE_VALUES ={
    "C++" : "cpp",
    "Python" : "python",
    "Java" : "java",
}

export const CODE_SNIPPETS = {
    cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int t;
    cin>>t;
    while(t--)
    {
        //write your code here..
    }
    return 0;
}`,
    python: `def main():
    t = int(input())
    while t > 0:
        # write your code here..
        
        t -= 1

if __name__ == "__main__":
    main()
`,
    java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`
};
